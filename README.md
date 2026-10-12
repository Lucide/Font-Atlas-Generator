# Font Atlas Generator

<https://lucide.github.io/Font-Atlas-Generator/>

Generate a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas) from a specified font's glyphs, that you can use on [REXPaint](https://www.gridsagegames.com/rexpaint/), [lvllvl.com](https://lvllvl.com/), [Playscii](http://vectorpoem.com/playscii/), ecc

* write the glyphs you want to use (*charset*), the default one is [REXPaint](https://www.gridsagegames.com/rexpaint/)'s default
* enter the font name if you have it already available in your system (*e.g. it's installed*), otherwise, you can load a font file
* you can define an arbitrary amount of fallback fonts in the corresponding fields regulated by the *Fallback fonts* spinner. The usage is top to bottom.
* tweak the settings to achieve the desired layout
* save the image by clicking on *save image*
* under **Options**, pick **Font color** and **Background color** for the atlas preview and PNG export
* enable **Transparent background** to export a PNG with an alpha channel (glyphs only); the preview still uses **Background color** so light glyphs remain visible

> **Warning**, the app uses unicode [variation selectors](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)) to prevent browsers from showing symbols in the emoji style. If you copy the string in the "charset" textarea, for every char there will be a `U+FE0E` variation selector following.

### Changelog

#### 1.1.0

* **Transparent background** — optional PNG export without a background fill; preview keeps the chosen background color for readability
* **Font color** and **Background color** pickers — control glyph and fill colors in preview and export (background color is omitted from export when transparent background is enabled)

#### 1.0.0

Initial release.

---

### features I'd like to add:

* [x] export sprite-glyph association metadata\
  ~~*the only editor I've seen supporting this is [Playscii](http://vectorpoem.com/playscii/)*~~ REXPaint now supports this feature too
* [ ] export additional metadata, for various programs
