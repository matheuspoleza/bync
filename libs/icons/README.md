# Icons

The iconography package for Voiceflow products.

## Installation

```sh
yarn add --exact @bync/icons
```

## How to add icons

- In Figma

  - Select icons you want
  - Run the SVG Export Plugin (<https://www.figma.com/community/plugin/814345141907543603>)
  - Import the `figma-svg-export-presets.json` file to SVG Export.
  - For monochrome icons, use the `VF-svg-monochrome` preset
  - For color icons, use the `VF-svg-color` preset

- In Finder
  - Copy icons into either the `./src/svgs/<color | monochrome>` package depending on the icon type

### Notes

- Preserve naming from design system as closely as possible. Makes collaboration between eng. and design easier.
- You may not be able to bulk export all the icons at once, instead having to select similar groups and exporting in batches.
- `ChatWidget` in the svg/color needs to be renamed to `ChatWidgetColor` to avoid naming collision and build failure.
- `Dialogflow ES` and `NuanceMix` need special exports, copying SVGs from figma instead of the normal export.
  Don't have a strong intuition why, but the plugin isn't able to handle it properly.
  - For these, you can right click `Copy/Paste as` and select `Copy as SVG` and paste it into the relevant file.
