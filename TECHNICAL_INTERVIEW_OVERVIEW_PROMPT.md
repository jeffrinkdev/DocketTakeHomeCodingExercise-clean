Technical Interview
The docket technical interview process is designed to efficiently evaluate a software developer’s ability to write code and communicate concisely and effectively about that code. Specifically:
Coding skills: Can the candidate demonstrate fluency with the language, stack, and TDD for the position they are applying for? For example, can a full stack developer with deep React experience demonstrate fluency with writing tests and then updating react code to pass the tests? We want to focus on a candidate’s strengths.
Communication skills: Can the candidate demonstrate strong communication skills by briefly describing how they chose their code sample and later discussing a series of problems in the technical interview while writing code?
Technical Interview process
The technical interview process consists of the following steps:
This document is shared with the candidate. Sometimes the candidate will have a few questions, which are both encouraged and welcomed.
The candidate submits:
A very short code sample, which includes at least one test. See below for more details on how to think about a code sample.
A very short cover letter, which explains why they chose the code sample.
A short list of times that they are available for a 60 minute technical interview. 
The interviewer will schedule a 60 minute technical interview and the candidate will accept the interview or suggest an alternative time.
During the technical interview, the candidate will join a Google Meet online meeting, share their entire screen, and solve code problems that build on the sample that they submitted. See below for more on the technical interview.
After the technical interview, Docket team will quickly provide feedback on the results of the interview.
Use of AI Coding tools is allowed and encouraged - show us what you’ve got

The following pages provide additional information about submitting a code sample and what to expect in the technical interview, to allow candidates to be as prepared as they would like to be. We hope a quick skim will often be sufficient to give you a clear idea of what to expect.

Submitting a code sample
The goal of the code sample is for the candidate to demonstrate that:
Candidate has read and considered the instructions for the technical interview.
Candidate can provide code that they are comfortable with using as a starting point for their interview. Please pick something that reflects your strengths! We’re much more interested in your strengths than in any areas of opportunity since we have limited time together during the interview process.
Candidate can write a test.
Candidate can write a short cover letter that kicks off the technical interview process.

Please do not spend more than an hour preparing your code sample. Simply pick a starting point that you will be comfortable with. If you have not been practicing TDD, you may want to practice a bit before the interview.
Examples of code samples
Please ensure that for any code sample you provide:
The code sample is short, and easy for us to review
The code sample can be used as a starting point for a technical interview
The code sample includes a test
The code sample is easy to review because your published it to a sandbox, a public git repo, or attached a zip file that is easy for us to review
Minimum code sample
A minimum code sample, which we do not recommend, but is guaranteed to make an impression:

npx create-react-app my-app
A code sample like this tells us that you consider yourself to be a senior or staff-level developer with encyclopedic knowledge of React, and you’re hoping for a technical interview that allows you to demonstrate the breadth and depth of your React skills. create-react-app comes with testing OOB, so you don’t even have to write a test if you do this 🙂

A more specific code sample
We recommend providing a SHORT code sample that reflects an area you’ve been working with recently. For example, if you’ve recently been writing a ton of code with react-query, you might use a sample that is very similar to one of the react-query examples:

import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const retrievePosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
};

const DisplayPosts = () => {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery("postsData", retrievePosts);

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default DisplayPosts;

Source: https://refine.dev/blog/react-query-guide/#performing-basic-data-fetching

Remember that you should make sure that your sample includes a test as well!
A more complex project
Perhaps you have a more complex project that you’d like to use as your sample? This will require a little more work on both of our parts, but this is great too!

For a longer project, please be sure to:
Tell us exactly where to look (path and line numbers please, a github link is always appreciated). We’d rather not read more than 100 lines of code, and will not consider a sample that requires to navigate multiple files without clear, concise instructions.
Provide a brief context. This should be less than a page, and if you’re going to make us read, please be sure to write well. A good Readme is fantastic. We love Readmes!
Provide path and line numbers for the test that covers the code you’d like us to look at

Sending us a complex project is a great way to demonstrate presence or absence of strong communication skills. We’re very much looking for the former!


The technical interview
The technical interview is a 60 minute Google Meet meeting where you will be asked to share your screen, write code to solve two to four problems we give you, and talk about the code you’re writing as you work.

The goal is to give you a chance to demonstrate fluency as a developer and strong communication skills. We would like to see you at your best.

Some details:
The format of the interview is Test Driven Development (TDD). You will be asked to write a failing test before you start writing code. This is important.
The first question we give you will be easy, so that we have a chance to get used to the format. For example, given a react app, we might ask you to add a button to the app that performs a trivial task. Later questions will get progressively harder, and the goal is to be in the middle of solving a hard problem at the end of the interview (completing the solution is not usually important.
Please use the IDE you are most comfortable using. You are welcome to use any AI tools and IDE extensions you feel will make you more productive.
For each problem, you will need to write a failing test and then write code to get your test to pass. Your IDE should be set up so that you can easily create and execute tests.
We will want to talk to you about the problems as you work on them. Your communication skills are as critical as your coding skills. Please be ready to have a conversation about your code.
This is an open book test. You should ask us for help if you get stumped along the way. You should use search engines, stack overflow, and reference sites during the interview in the same way you would in the normal course of your work, and share your screen as you do so in order that we can get a glimpse as to what tools you like to use and how you think.
Sample technical interview
Let’s say you are a staff-level React engineer and the challenge of a wide open technical interview appeals to you. You used create-react-app as a coding sample.

For the first problem, we’ll ask you to create a button that changes color when you click it. You’ll delight us by having planned ahead and already created a create-react-app project and set up Testing Library.
You’ll write a failing test that checks that the app renders a button.
You’ll create a new button so that the test passes
You’ll update your test to check that color toggles when clicked, so that test fails again.
You’ll implement a toggle so that the test passes again.

For the subsequent problems, we’ll ask you to implement a hook, use context, and call an API. In each case you’ll write failing tests and then write code so that the tests start to pass. We’ll ask you about the approach you're choosing, and you’ll share why you favor certain design patterns over others. We’ll learn about how you think about software development, and vice versa.

At the fifty-five minute mark we’ll probably be in the middle of a problem and decide to break from it and quickly retrospect about the interview process, and then we’ll call it a day.
