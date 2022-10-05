# Svelte Scrolling

[![npm][npm-shields]](https://www.npmjs.com/package/svelte-scrolling)
[![license][license-shields]](https://github.com/valmisson/svelte-scrolling/blob/main/LICENSE)

Scroll to given elements with smooth animation.

## Install

```bash
npm i svelte-scrolling
```

or similar, like

```bash
yarn add svelte-scrolling
```

## Usage

```html
<script>
  import { scrollTo, scrollRef, scrollTop } from 'svelte-scrolling'
</script>

<nav>
  <a use:scrollTo={'home'}>Home</a>
  <a use:scrollTo={'about'}>About</a>
  <a use:scrollTo={{ ref: 'blog', duration: 1000 }}>Blog</a>
</nav>

<section use:scrollRef={'home'}></section>
<section use:scrollRef={'about'}></section>
<section use:scrollRef={'blog'}></section>

<button on:click={() => scrollTop()}>Go to top</button>
```

## Actions

#### `scrollTo={reference | options}`

This action listens for click (touchstart) events and scrolls to elements with smooth animation.

Accepts as parameter only the element reference or all global options:

- `ref`: Element reference.

*To set the global options, the `ref` property is required*

#### `scrollRef={reference}`

This action adds a reference to the elements that `scrollTo` should scroll

Accepts as parameter a string with the name to reference the element

## Functions

#### `scrollTop(options?)`

Scroll to the top of the page

#### `scrollBottom(options?)`

Scroll to the end of the page

#### `scrollElement(reference, options?)`

Scroll to element with smooth animation.

#### `scrollPosition(position, options?)`

Scroll to a position on the page

## API

### Global Options

| Property | Default | Description |
|:--------:|:-------:|:-----------:|
| `duration` | `500` | Duration (in milliseconds) of the animation. |
| `offset` | `0` | Offset that should be applied when scrolling. |
| `easing` | `cubicInOut` | Easing function to be used when animating. Use any easing from [`svelte/easing`][svelte-easing] or a custom easing function. |
| `onStart` | `noop` | A callback function that should be called when scrolling has started. Receives the element, offset, duration and endPosition as a parameter. |
| `onDone` | `noop` | A callback function that should be called when scrolling has started. Receives the element, offset, duration and endPosition as a parameter. |

### Override global options

```html
<script>
  import { setGlobalOptions } from 'svelte-scrolling'

  setGlobalOptions({
    duration: 800
  })
</script>
```

## License
[MIT](LICENSE)

Copyright (c) 2021 Valmisson Grizorte


[npm-shields]: https://img.shields.io/npm/v/svelte-scrolling.svg
[license-shields]: https://img.shields.io/badge/license-MIT-green
[svelte-easing]: https://svelte.dev/docs#svelte_easing
