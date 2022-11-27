const matter = require("gray-matter")
const fs = require("fs")
const request = require("request")
const { API_ID, API_KEY, slug } = require("./env.js")

const mdsrc = `blog-articles/${slug}.md`

const article = fs.readFileSync(mdsrc, "utf-8")
const frontmatter = matter(article).data
const title = frontmatter.title
// frontmatter contains variables for the template: on hcti.io there is an already saved template
request
   .post({
      url: "https://hcti.io/v1/image/t-2d709d92-202c-4111-9833-b483c27c7ea1",
      form: {
         template_values: JSON.stringify({ article_title: title }),
      },
   })
   .auth(API_ID, API_KEY)
   .on("data", function (data2) {
      console.log(JSON.parse(data2))
   })
