# Font Atlas Generator

<https://lucide.github.io/font-atlas-generator/>

Generate a [texture atlas](https://en.wikipedia.org/wiki/Texture_atlas) from a specified font's glyphs, that you can use on [REXPaint](https://www.gridsagegames.com/rexpaint/), [lvllvl.com](https://lvllvl.com/), [Playscii](http://vectorpoem.com/playscii/), ecc

* enter the font name if you have it already available in your system (*e.g. it's installed*), otherwise, you can load a font file
* write the glyphs you want to use (*charset*), the default one is [REXPaint](https://www.gridsagegames.com/rexpaint/)'s default
* tweak the settings to achieve the desired spacing
* save the image by right clicking → *save image*

> **Warning**, the app uses unicode [variation selectors](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block)) to prevent browsers from showing symbols in the emoji style. If you copy the string in the "charset" textarea, for every char there will be a `U+FE0E` variation selector following.\
Beware

---

### features I'd like to add:

* [ ] export metadata, for various programs\
  *as string? as file?*
* [ ] export sprite-glyph association metadata\
  *the only editor I've seen supporting this is [Playscii](http://vectorpoem.com/playscii/)*
