let num = 0;
const btns = document.querySelectorAll('.btn');
highlight(btns);
getImag(num);
// console.log(btns);
btns.forEach(btn => {
  btn.addEventListener('click', e => {
    if (isNaN(e.target.innerText) === false) {
      num = e.target.innerText;
    } else if (e.target.innerText === 'next') {
      if (num < 7) {
        num++;
      }
    } else if (e.target.innerText === 'previous') {
      if (num > 0) {
        num--;
      }
    }
    getImag(num);
    highlight(btns);
  });
});
function highlight(btns) {
  btns.forEach(id => {
    if (id.attributes.id.value == num) {
      id.classList.add('pik');
    } else {
      id.classList.remove('pik');
    }
  });
}
function getImag(num) {
  fetch(
    `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://www.bing.com/HPImageArchive.aspx?format=js&idx=${num}&n=8&mkt=en-US`
    )}`
  )
    .then(resp => {
      if (resp.ok) return resp.json();
      // console.log(resp);
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      const contents = JSON.parse(data.contents);
      const { images } = contents;
      const site = 'https://www.bing.com/';
      document.body.style.backgroundImage = `url("${site}${images[0].url}")`;
    });
}
