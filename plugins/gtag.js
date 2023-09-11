export default ({ app }) => {
    if (process.browser) {
      // Загружаем скрипт Google Tag Manager
      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'G-E9D5N1TTMS'); // Ваш идентификатор Google Tag Manager
  
      // Отправляем данные в Google Analytics
      app.router.afterEach((to, from) => {
        window.gtag('config', 'G-E9D5N1TTMS', { // Ваш идентификатор Google Analytics
          page_path: to.fullPath,
        });
      });
    }
  };
  