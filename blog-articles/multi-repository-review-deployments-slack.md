---
title: "Slack-powered multi-repository deployments"
pubdate: 2020-08-15
lastupdate: 2022-11-27
description: "How to deploy a full-stack web application using Slack modals and Gitlab CI"
previewurl: "https://hcti.io/v1/image/423679d28697d8ab2bc8754fca6732d486d58fce34fe8a157baffd52498ee2bc"
---

## Multi-repository deployments with Slack Modals and Gitlab CI

In this article I want to bring you through the journey of how we can enhance developer experience by deploying feature branches from 2+ repositories simultaneously. The idea is that developers can use Slack Modals and Gitlab CI to deploy their feature branches to be tested live, before merging them into the `main` branch. This approach assumes that the webapp codebase is splitted among several repositories, hence the usage of Slack as a central way of orchestrating the multiple deployments.

### Review environments FTW

According to the best practices of most git flows (e.g. [gitlab flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)) the `main` branch is an _always-deployable_ branch which means that should be stable enough to be deployed on a _staging_ server.

Introducing subtle bugs in the `main` branch is dangerous for other developers too, not just for business. Usually when a new `feature-branch` is created, the `main` one is used as base and therefore bugs present there will be inherited too, possibly slowing down or distracting devs.

Automated tests are good, but sometimes you need some Quality Assurance testing to be done because of a large refactoring. Gitlab introduced the concept of **review environments**: you may want to deploy your `feature-branch` in a _pre-staging_ server and see your changes live on a website to increase the probability of spotting bugs **before** merging into the `main` branch.

![Review environment usual workflow](https://docs.gitlab.com/ee/ci/review_apps/img/continuous-delivery-review-apps.svg)

But how do you deploy review environments from multiple repositories simultaneously?

### Multi-repository workflow

If we take web applications, usually the codebase is splitted in at least 2 repos: back-end and front-end. When introducing refactorings, we'd like to test them at the same time. Since the **repository-scoped** nature of Gitlab CI, it's difficult to apply the same logic to review environments; how do I review the changes I have in these two repositories, **together**? The common situation is that you will have one branch per repo (i.e. `feature-branch-back-end` and `feature-branch-front-end`) and you want these branches deployed, talking to each other.
In order to achieve the desired result we need to:

-  Trigger one review deployment per repo
-  Pass custom variables to Gitlab CI so that we can customize the URL configuration
-  (optional, for a multi-tenant app) Pass an additional custom variable which define the tenant you are building for.

### Passing variables to the CI

Passing custom variables to Gitlab CI/CD is easy and you have different options for it:

1. If you have a manual job in your pipeline, you can specify custom variables through the Gitlab web UI.
2. While pushing commits: `git push origin branch -o ci.variable="CUSTOM_VARIABLE1=one" -o ci.variable="CUSTOM_VARIABLE2=two" ...`
3. Using the Gitlab API you can [trigger pipelines with additional variables](https://docs.gitlab.com/ee/ci/triggers/#making-use-of-trigger-variables)

Option number 3 seems the most flexible and automatable.

As I briefly introduced, using the [Gitlab Trigger API](https://docs.gitlab.com/ee/ci/triggers/) lets you easily trigger new pipelines. Let's see how to do it from a NodeJS script:

```js
let formData = new FormData();
formData.append("ref", ref);
// Token with API Trigger permissions
formData.append("token", process.env.GITLAB_TRIGGER_TOKEN);
const response = await fetch(`https://gitlab.com/api/v4/projects/${repo_id}/trigger/pipeline`, {
   method: "POST",
   headers: {
      // Token able to invoke Gitlab API on the target repo
      Authorization: `Bearer ${process.env.GITLAB_API_TOKEN}`
   },
   body: formData
});
const data = await response.json();
```

`ref` is the name of the branch/tag on which we want to run the pipeline. How to retrieve other tokens/values is well documented on the Gitlab Docs so I won't spend much time on it.

The important and useful thing is that when triggering the pipeline we want specific jobs to be executed, therefore we can pass an additional variable which identify that the pipeline has been triggered through the API:

```js
...
formData.append("variables[CP_TRIGGER]", "Triggered from NodeJS.")
...
```

...and in our `.gitlab-ci.yml` we can define a rule to execute a job only if that variable (`CP_TRIGGER`) is present:

```yaml
review:deploy:
   stage: review
   script:
      - echo "Deploying from NodeJS"
      ...
   rules:
      - if: CP_TRIGGER
```

Given that we want to deploy a full-stack application, living in 2 separate repositories, we need to call the Gitlab Trigger API twice from the same script. Which is doable, but I want to show you how you can integrate Slack into the workflow to have a interactive and user-friendly way to start new deployments.

### Easing the interaction with Slack modals

In my use case, I have a multi-tenancy web application, therefore I would like to specify also which customer-ized app I want to deploy.

With Slack modals we can we can build a modal, composed by several dropdowns or input fields, populated based on our needs.
![Slack modal example screenshot](/images/slack-modal-example.png)
In this example I list all the open Merge Requests for the front-end and the back-end in the two initial dropdowns so that developers know exactl which code are they deploying. The third parameter is the tenant, to customize the app.
In this case then, I'm deploying a full-stack review environments built on top of the Merge Requests source branches code.

You can request the opening of a custom modal by creating a Slack app and integrating it into your channel. To enrich the dropdowns with custom information you have to build a back-end which calls the Gitlab API, retrieving the list of Merge Requests or branches you need.

When pressing the **Do it man** button the modal send all these options, one common subdomain namespace has to be created and both the project's pipeline triggered with the namespace as a custom parameter!

In order to summarize the whole process, here it is the high-level flow of information:
![Flow of information of multi-repo deployments with Gitlab and Slack](/images/deployment-workflow-slack.svg)

I hope you got inspired! :)
