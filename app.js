const cursor = document.createElement('div')
cursor.className = 'custom-cursor'
document.body.appendChild(cursor)

// move cursor
document.addEventListener('mousemove', e => {
cursor.style.left = e.clientX + 'px'
cursor.style.top = e.clientY + 'px'
})

// scale on hover
document.querySelectorAll('a, button, .interactive, input[type="submit"],input[type="image"], span.underline').forEach(el => {
el.addEventListener('mouseenter', () => cursor.classList.add('hover'))
el.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
})