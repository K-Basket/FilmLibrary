async function e(e){const t=await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=c05652c397b2dd01065e8cba4a8a45ab&page=${e}`);return await t.json()}async function t(e,t){const n=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=c05652c397b2dd01065e8cba4a8a45ab&query=${e}&page=${t}&include_adult=false`);return await n.json()}const n=document.querySelector(".js-btn-home"),s=document.querySelector(".js-btn-mylibrary"),c=document.querySelector("#search-form"),a=document.querySelector(".js-btn-watched"),o=document.querySelector(".js-btn-queue"),i=document.querySelector("#movie-list"),l=document.querySelector("#btn-load-more"),r=document.querySelector(".js-backdrop"),d=document.querySelector(".js-modal-close");function u(e){return e.map((e=>`\n<li class="movie-item" id="movie-item" data-id="${e.id}">\n  <article class="movie article">\n    <div class="movie-card-thumb">\n      ${e.poster_path?`\n      <img\n        src="https://image.tmdb.org/t/p/w500${e.poster_path}"\n        alt="poster ${e.title}"\n      />`:'<img\n        src="https://image.tmdb.org/t/p/w500/dykOcAqI01Fci5cKQW3bEUrPWwU.jpg"\n        alt="poster none"\n      />'}\n    </div>\n    <div class="movie-content">\n      <h3 class="movie-title">${e.title}</h3>\n      <p class="movie-genre">${e.genre_ids} | ${e.release_date}</p>\n    </div>\n  </article>\n</li>`)).join("")}function m(e,t){e.insertAdjacentHTML("beforeend",t)}function v(e){if("UL"!==e.target.nodeName)return e.target.closest("#movie-item").dataset.id}function h(e){const{height:t}=e.firstElementChild.getBoundingClientRect();window.scrollBy({top:2*t,behavior:"smooth"})}function y(e,t){t.page===t.total_pages?e.classList.add("visually-hidden"):e.classList.remove("visually-hidden")}console.log("💙💛 K-Basket"),n.addEventListener("click",(function(){n.classList.add("btn-black"),s.classList.remove("btn-black"),c.classList.remove("visually-hidden"),a.classList.add("visually-hidden"),o.classList.add("visually-hidden")})),s.addEventListener("click",(function(){n.classList.remove("btn-black"),s.classList.add("btn-black"),c.classList.add("visually-hidden"),a.classList.remove("visually-hidden"),o.classList.remove("visually-hidden")})),window.addEventListener("load",p),l.addEventListener("click",p),c.addEventListener("submit",(async function(e){if(e.preventDefault(),b=e.currentTarget.searchQuery.value,""===b)return;i.innerHTML="",g=1,l.removeEventListener("click",p),l.addEventListener("click",L),e.currentTarget.reset();try{const e=await t(b,g);console.log("Search",e),m(i,u(e.results)),y(l,e),g+=1}catch(e){console.log(e)}}));let g=1,b="";async function p(){try{const t=await e(g);console.log("Trending",t),m(i,u(t.results)),y(l,t),1!==g&&h(i),g+=1}catch(e){console.warn(e)}}async function L(){try{const e=await t(b,g);console.log("SearchLoadMoree",e),m(i,u(e.results)),h(i),y(l,e),g+=1}catch(e){console.log(e)}}function f(){document.body.classList.remove("show-modal","stop-scroll")}i.addEventListener("click",(function(e){console.log(v(e)),v(e)&&document.body.classList.add("show-modal","stop-scroll")})),d.addEventListener("click",f),r.addEventListener("click",(function(e){e.currentTarget===e.target&&f()})),window.addEventListener("keydown",(function(e){"Escape"===e.code&&f()}));
//# sourceMappingURL=index.da04e445.js.map
