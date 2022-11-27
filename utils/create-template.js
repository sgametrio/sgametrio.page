const request = require("request")
const { API_ID, API_KEY, slug } = require("./env.js")

const data = {
   html: `
   <div class="font-prose bg-gradient-orange p-4 w-96">
      <div class="rounded-lg bg-gray-800 p-4">
         <h1 class="text-white font-semibold text-xl mb-6 mt-0">{{article_title}}</h1>
         <div class="flex w-full">
            <img class="rounded-full" alt="profile picture" src="https://www.sgametrio.page/images/profile.jpg" width="64" height="64"/>
            <div class="flex flex-col justify-center ml-4">
               <div class="text-white mb-1 text-lg font-semibold">Demetrio Carrara</div>
               <div class="text-gray-200 text-sm w-full inline-flex items-center italic">
                  @sgametrio
                  <img class="ml-2" src="https://sgametrio.page/images/vendor/twitter-icon-color.png" style="width:20px;height:20px;"/>
                  <img class="ml-2" src="https://sgametrio.page/images/vendor/github-icon-light.png" style="width:20px;height:20px;"/>
               </div>
            </div>
         </div>
      </div>
   </div>
   `,
   css: `
   @font-face {
      font-family: 'Merriweather';
      font-style: normal;
      font-weight: 400;
      src: local('Merriweather Regular'), local('Merriweather-Regular'), url(https://fonts.gstatic.com/s/merriweather/v19/u-440qyriQwlOrhSvowK_l5-fCZM.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   
   /* latin */
   @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 300;
      src: local('Fira Sans Light'), local('FiraSans-Light'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnPKreRhf6.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
   
   /* latin */
   @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 400;
      src: local('Fira Sans Regular'), local('FiraSans-Regular'), url(https://fonts.gstatic.com/s/firasans/v10/va9E4kDNxMZdWfMOD5Vvl4jL.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   
   @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 500;
      src: local('Fira Sans Medium'), local('FiraSans-Medium'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   
    /* latin */
   @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 600;
      src: local('Fira Sans SemiBold'), local('FiraSans-SemiBold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnSKzeRhf6.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   
   /* latin */
   @font-face {
      font-family: 'Fira Sans';
      font-style: normal;
      font-weight: 700;
      src: local('Fira Sans Bold'), local('FiraSans-Bold'), url(https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnLK3eRhf6.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
   
:root {
--font-prose: "Fira Sans", sans-serif;
--font-title: "Merriweather", sans-serif;
}
.italic {
 font-style: italic;
}

.font-prose {
font-family: var(--font-prose);
}

.block {
 display: block;
}
.inline-flex {
 display: inline-flex;
}

.items-center {
 align-items: center;
}
.font-semibold {
 font-weight: 600;
}
.text-base {
 font-size: 1rem;
}

.items-center {
 align-items: center;
}

.justify-center {
 justify-content: center;
}
h1, h2, h3 {
font-family: var(--font-title);
line-height: 2rem;
}

.py-1 {
padding-top: 0.25rem;
padding-bottom: 0.25rem;
}

.text-xl {
 font-size: 1.25rem;
}
.text-lg {
 font-size: 1.125rem;
}
.text-sm {
 font-size: 0.875rem;
}

.mt-0 {
margin-top: 0;
}
.mb-4 {
 margin-bottom: 1rem;
}

.mb-1 {
 margin-bottom: 0.25rem;
}

.ml-4 {
 margin-left: 1rem;
}

.mr-2 {
 margin-right: 0.5rem;
}

.ml-2 {
 margin-left: 0.5rem;
}

.flex {
 display: flex;
}

.flex-col {
 flex-direction: column;
}

.w-full {
 width: 100%;
}

.w-96 {
 width: 24rem;
}

.justify-between {
 justify-content: space-between;
}

.bg-gradient-orange {
background: linear-gradient(315deg, rgba(255,0,0,1) 0%, rgba(255,72,0,1) 39%, rgba(255,188,0,1) 100%);
}

.bg-gray-800 {
 --bg-opacity: 1;
 background-color: #2d3748;
 background-color: rgba(45, 55, 72, var(--bg-opacity));
}

.text-gray-200 {
 --text-opacity: 1;
 color: #edf2f7;
 color: rgba(237, 242, 247, var(--text-opacity));
}

.p-4 {
 padding: 1rem;
}

.rounded-lg {
border-radius: 0.5rem;
}

.rounded-full {
 border-radius: 9999px;
}

.text-white {
 --text-opacity: 1;
 color: #fff;
 color: rgba(255, 255, 255, var(--text-opacity));
}
   `,
   google_fonts: "Fira Sans|Merriweather",
}
request
   .post({ url: "https://hcti.io/v1/template/t-2d709d92-202c-4111-9833-b483c27c7ea1", form: data })
   .auth(API_ID, API_KEY)
   .on("data", function (data2) {
      console.log(JSON.parse(data2))
   })
