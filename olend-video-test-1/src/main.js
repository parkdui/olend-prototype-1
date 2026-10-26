import './style.css'
import backgroundVideo from './assets/test_kling4_1.mp4'

document.querySelector('#app').innerHTML = `
  <video class="background-video" aria-hidden="true" muted playsinline preload="auto">
    <source src="${backgroundVideo}" type="video/mp4" />
  </video>
  <main class="experience">
    <header class="intro">
      <p class="eyebrow">A moment in motion</p>
      <h1>Move with<br />the moment.</h1>
      <p class="instructions">Drag a card down to reveal the next two seconds.</p>
    </header>

    <section class="carousel-section" aria-label="Moment carousel">
      <div class="section-heading">
        <span>Choose a moment</span>
        <span class="drag-hint">Swipe to explore</span>
      </div>
      <div class="carousel" aria-label="Draggable moments">
        <button class="moment-card" type="button" data-tone="sand">
          <span class="card-number">01</span>
          <span class="card-label">Breathe</span>
          <span class="card-mark" aria-hidden="true">↗</span>
        </button>
        <button class="moment-card" type="button" data-tone="coral">
          <span class="card-number">02</span>
          <span class="card-label">Unfold</span>
          <span class="card-mark" aria-hidden="true">↗</span>
        </button>
        <button class="moment-card" type="button" data-tone="blue">
          <span class="card-number">03</span>
          <span class="card-label">Drift</span>
          <span class="card-mark" aria-hidden="true">↗</span>
        </button>
        <button class="moment-card" type="button" data-tone="green">
          <span class="card-number">04</span>
          <span class="card-label">Return</span>
          <span class="card-mark" aria-hidden="true">↗</span>
        </button>
      </div>
    </section>

    <section class="drop-zone" aria-label="Drop area">
      <span class="drop-icon" aria-hidden="true">↓</span>
      <p>Drop your moment here</p>
      <span class="drop-caption">The film will move with you</span>
    </section>

    <footer class="playback-status" aria-live="polite">
      <div class="status-row">
        <span class="status-indicator" aria-hidden="true"></span>
        <span id="status-text">Loading the film…</span>
      </div>
      <div class="timeline" aria-label="Film progress">
        <span id="timeline-fill"></span>
      </div>
      <div class="time-row">
        <span id="current-time">00:00</span>
        <span id="total-time">--:--</span>
      </div>
    </footer>
  </main>
`

const video = document.querySelector('.background-video')
const carousel = document.querySelector('.carousel')
const dropZone = document.querySelector('.drop-zone')
const statusText = document.querySelector('#status-text')
const currentTimeLabel = document.querySelector('#current-time')
const totalTimeLabel = document.querySelector('#total-time')
const timelineFill = document.querySelector('#timeline-fill')

const segmentDuration = 2
let completedSegments = 0
let isPlayingSegment = false
let animationFrame = 0
let activeDrag = null

const formatTime = (seconds) => {
  const wholeSeconds = Math.floor(seconds)
  const minutes = Math.floor(wholeSeconds / 60)
  const remainder = wholeSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
}

const updatePlaybackDisplay = () => {
  const duration = Number.isFinite(video.duration) ? video.duration : 0
  const time = video.currentTime || 0

  currentTimeLabel.textContent = formatTime(time)
  totalTimeLabel.textContent = duration ? formatTime(duration) : '--:--'
  timelineFill.style.width = duration ? `${Math.min((time / duration) * 100, 100)}%` : '0%'
}

const updateStatusForNextSegment = () => {
  const nextEnd = (completedSegments + 1) * segmentDuration

  if (nextEnd > video.duration) {
    statusText.textContent = 'You’ve reached the end of the film.'
    dropZone.classList.add('is-complete')
    return
  }

  statusText.textContent = `Ready for ${formatTime(completedSegments * segmentDuration)}–${formatTime(nextEnd)}`
  dropZone.classList.remove('is-complete')
}

const finishSegment = (endTime) => {
  cancelAnimationFrame(animationFrame)
  video.pause()
  video.currentTime = endTime
  isPlayingSegment = false
  updatePlaybackDisplay()
  updateStatusForNextSegment()
  dropZone.classList.remove('is-playing')
}

const watchSegment = (endTime) => {
  if (video.currentTime >= endTime) {
    finishSegment(endTime)
    return
  }

  animationFrame = requestAnimationFrame(() => watchSegment(endTime))
}

const playNextSegment = async () => {
  if (isPlayingSegment) return

  if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
    statusText.textContent = 'The film is still loading. Try again in a moment.'
    return
  }

  const startTime = completedSegments * segmentDuration
  const endTime = startTime + segmentDuration

  if (endTime > video.duration) {
    updateStatusForNextSegment()
    return
  }

  isPlayingSegment = true
  dropZone.classList.add('is-playing')
  video.currentTime = startTime

  try {
    await video.play()
    completedSegments += 1
    statusText.textContent = `Playing ${formatTime(startTime)}–${formatTime(endTime)}`
    animationFrame = requestAnimationFrame(() => watchSegment(endTime))
  } catch (error) {
    video.pause()
    video.currentTime = startTime
    isPlayingSegment = false
    dropZone.classList.remove('is-playing')
    statusText.textContent = 'Playback could not start. Please try again.'
    console.error('Unable to play the next video segment:', error)
  }
}

video.addEventListener('loadedmetadata', () => {
  video.pause()
  video.currentTime = 0
  completedSegments = 0
  updatePlaybackDisplay()
  updateStatusForNextSegment()
})

video.addEventListener('timeupdate', updatePlaybackDisplay)
video.addEventListener('error', () => {
  statusText.textContent = 'The film could not be loaded.'
  console.error('Unable to load the background video.')
})

const clearDrag = () => {
  if (!activeDrag) return

  activeDrag.preview?.remove()
  activeDrag.card.classList.remove('is-dragging')
  activeDrag = null
  dropZone.classList.remove('is-target')
}

const createPreview = (card, x, y) => {
  const preview = card.cloneNode(true)
  const bounds = card.getBoundingClientRect()

  preview.classList.add('drag-preview')
  preview.style.width = `${bounds.width}px`
  preview.style.height = `${bounds.height}px`
  preview.style.left = `${x - bounds.width / 2}px`
  preview.style.top = `${y - bounds.height / 2}px`
  document.body.append(preview)
  return preview
}

carousel.addEventListener('pointerdown', (event) => {
  const card = event.target.closest('.moment-card')
  if (!card || event.button !== 0 || isPlayingSegment) return

  activeDrag = {
    card,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    preview: null,
  }
  card.setPointerCapture(event.pointerId)
})

carousel.addEventListener('pointermove', (event) => {
  if (!activeDrag || activeDrag.pointerId !== event.pointerId) return

  const distance = Math.hypot(event.clientX - activeDrag.startX, event.clientY - activeDrag.startY)
  if (!activeDrag.preview && distance < 8) return

  if (!activeDrag.preview) {
    activeDrag.preview = createPreview(activeDrag.card, event.clientX, event.clientY)
    activeDrag.card.classList.add('is-dragging')
  }

  activeDrag.preview.style.left = `${event.clientX - activeDrag.preview.offsetWidth / 2}px`
  activeDrag.preview.style.top = `${event.clientY - activeDrag.preview.offsetHeight / 2}px`

  const bounds = dropZone.getBoundingClientRect()
  const overDropZone = event.clientX >= bounds.left
    && event.clientX <= bounds.right
    && event.clientY >= bounds.top
    && event.clientY <= bounds.bottom
  dropZone.classList.toggle('is-target', overDropZone)
})

const endDrag = (event) => {
  if (!activeDrag || activeDrag.pointerId !== event.pointerId) return

  const dragged = Boolean(activeDrag.preview)
  const bounds = dropZone.getBoundingClientRect()
  const droppedInZone = event.clientX >= bounds.left
    && event.clientX <= bounds.right
    && event.clientY >= bounds.top
    && event.clientY <= bounds.bottom

  clearDrag()

  if (dragged && droppedInZone) {
    void playNextSegment()
  }
}

carousel.addEventListener('pointerup', endDrag)
carousel.addEventListener('pointercancel', clearDrag)

carousel.querySelectorAll('.moment-card').forEach((card) => {
  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    void playNextSegment()
  })
})

updatePlaybackDisplay()
