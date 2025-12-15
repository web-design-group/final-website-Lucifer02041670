(() => {
  function enableDragScroll(container, axis = 'x') {
    let isDown = false;
    let startX = 0, startY = 0;
    let scrollLeft = 0, scrollTop = 0;

    const onDown = (e) => {
      isDown = true;
      container.classList.add('is-dragging');
      startX = (e.touches ? e.touches[0].pageX : e.pageX);
      startY = (e.touches ? e.touches[0].pageY : e.pageY);
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    };

    const onMove = (e) => {
      if (!isDown) return;
      const x = (e.touches ? e.touches[0].pageX : e.pageX);
      const y = (e.touches ? e.touches[0].pageY : e.pageY);
      const dx = x - startX;
      const dy = y - startY;

      if (axis === 'x') {
        container.scrollLeft = scrollLeft - dx;
      } else {
        container.scrollTop = scrollTop - dy;
      }
    };

    const onUp = () => {
      isDown = false;
      container.classList.remove('is-dragging');
    };

    container.addEventListener('mousedown', onDown);
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseup', onUp);
    container.addEventListener('mouseleave', onUp);

    container.addEventListener('touchstart', onDown, { passive: true });
    container.addEventListener('touchmove', onMove, { passive: true });
    container.addEventListener('touchend', onUp);
    container.addEventListener('touchcancel', onUp);
  }

  function enableWheelHorizontal(container) {
    container.addEventListener('wheel', (e) => {
      const atHorizontal = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      if (atHorizontal && container.scrollWidth > container.clientWidth) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  function initHorizontalTips() {
    document.querySelectorAll('.catalog-groups .tip .cards').forEach(cards => {
      cards.classList.add('hscroll');

      enableDragScroll(cards, 'x');
      enableWheelHorizontal(cards);
    });
  }

  function initVerticalList() {
    const list = document.querySelector('.filters-section .listpanel');
    if (!list) return;

    list.classList.add('vscroll');

    enableDragScroll(list, 'y');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHorizontalTips();
    initVerticalList();
  });
})();