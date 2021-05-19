# svelte-smartscroll

[![npm][npm-shields]](https://www.npmjs.com/package/svelte-smartscroll)
[![license][license-shields]](https://github.com/valmisson/svelte-smartscroll/blob/main/LICENSE)

Scroll to given elements with smooth animation.

## Install
```bash
yarn add svelte-smartscroll
```

## Usage

```html
<script>
  import { scrollTo, scrollRef } from 'svelte-smartscroll'
</script>

<nav>
  <a use:scrollTo={'home'}>Home</a>
  <a use:scrollTo={'about'}>About</a>
  <a use:scrollTo={{ ref: 'blog', duration: 1000 }}>Blog</a>
</nav>

<section use:scrollRef={'home'}></section>
<section use:scrollRef={'about'}></section>
<section use:scrollRef={'blog'}></section>
```

### Actions

#### `scrollTo={ string | Object }`

Accepts only the element reference or the global options.

#### `scrollRef={ string }`

Accepts a string with the name to reference the element

## API

### Global Options

| Property | Default | Description |
|:--------:|:-------:|:-----------:|
| `ref` | `""` | Element reference. |
| `offset` | `0` | Offset that should be applied when scrolling. |
| `duration` | `500` | Duration (in milliseconds) of the animation. |
| `easing` | `cubicInOut` | Easing function to be used when animating. Use any easing from [`svelte/easing`][svelte-easing] or a custom easing function. |

### Override global options

```html
<script>
  import { setGlobalOptions } from 'svelte-smartscroll'

  setGlobalOptions({
    offset: 50,
    duration: 800
  })
</script>
```

## License
[MIT](LICENSE)

Copyright (c) 2021 Valmisson Grizorte


[npm-shields]: https://img.shields.io/npm/v/svelte-smartscroll.svg
[license-shields]: https://img.shields.io/github/license/valmisson/svelte-smartscroll.svg
[svelte-easing]: https://svelte.dev/docs#svelte_easing
