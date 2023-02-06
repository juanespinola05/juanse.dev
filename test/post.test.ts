import { loadPost } from '../utils/post.ts'
import {
  assertEquals,
  assertNotEquals,
  assertObjectMatch,
  // assertObjectMatch,
} from 'std/testing/asserts.ts'
import { returnsNext, stub } from 'std/testing/mock.ts'
import { Post } from '../types/posts.d.ts'
import { render } from 'deno-gfm'
// import { Post } from '../types/posts.d.ts'

const POST_CONTENT = `---
title: Testing Post
excerpt: Testing Post Description
date: '2023/01/10'
readingTime: '5 minute reading'
tags:
  - javascript
  - vite
  - CSS
imageUrl: 'https://juanse.dev/image.png'
---

### Post body
`

const POST_DATA = {
  title: 'Testing Post',
  excerpt: 'Testing Post Description',
  date: '2023/01/10',
  readingTime: '5 minute reading',
  tags: ['javascript', 'vite', 'CSS'],
  imageUrl: 'https://juanse.dev/image.png',
}

Deno.test(
  'loadPost returns post data',
  async () => {
    const postId = 'test-post'
    const readTextFileStub = stub(
      Deno,
      'readTextFile',
      returnsNext([Promise.resolve(POST_CONTENT)]),
    )

    let post

    try {
      post = await loadPost(postId)
    } finally {
      readTextFileStub.restore()
    }

    assertNotEquals(post, null)
    assertObjectMatch(post as Post, {
      ...POST_DATA,
      body: render('### Post body'),
    })
  },
)

Deno.test('url test', () => {
  const url = new URL('./foo.js', 'https://deno.land/')
  assertEquals(url.href, 'https://deno.land/foo.js')
})
