# LayoutSplitter (still in dev)
Prototype of a layout composed of cells, which you can customized (by dropping a picture from your filesystem into it) using React (with a recursive component!) and pure HTML5 drag&drop features.

# To start
`npm install && gulp`

Open `build/client/index.html` in a browser.

# Interactions
- You can left-click on an area to split it. It will be split according to where your mouse is (top/bottom/right/left).
- You can drop an image from your file explorer to a cell
- You can right-click to remove the current image of a cell or to cancel the split of a cell (if there was no image).

# Example 

In 4 clicks, you can create the layout :
![ScreenShot](https://raw.githubusercontent.com/chtefi/LayoutSplitter/master/help/custom_images_before.PNG.png)

Then, by dropping from the file explorer to each cell :
![ScreenShot](https://raw.githubusercontent.com/chtefi/LayoutSplitter/master/help/images_before.PNG.png)

# TODO
- Be able to export flat HTML structure (without the containers)
- Be able to save the state to be able to reload it
- Display a treeview of this structure

