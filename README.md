<h1 align="center">Welcome to <a href="https://nix-group.github.io/pix" target="_blank">PIX</a> 👋</h1>
<p align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue" height="25"/>
  <img src="https://img.shields.io/badge/Photoswipe--2.2.7-yellow" height="25"/>
  <img src="https://img.shields.io/badge/PhotoAlbum--2.2.2-orange" height="25"/>
</p>

## Contents

<ul>
  <li><a href="#project-overview" target="_blank">Project overview</a></li>
  <li><a href="#installation-and-setup-instructions" target="_blank">Installation and Setup Instructions</a></li>
  <li><a href="#available-scripts">Available Scripts</a></li>
</ul>

## Project overview

An application designed to view photos and videos from Google Drive.

Authorization is carried out using gmail account. You must provide access to all specified actions with your Google Drive.

![image](https://github.com/nix-group/pix/assets/62059273/2f910010-cabf-49dd-8546-368251f3886b)

You can view your photos and videos in a convenient format. All you have to do is go to your media folder.

![image](https://github.com/nix-group/pix/assets/62059273/2887233f-ac7c-4ef4-b2a0-2307cef6e3d7)

You can navigate through folders using the folder block. Folders can be sorted by date added and name. Navigation is also possible with the help of breadcrumbs.<br/>
You can copy the link to the current folder, so that for example, another user could also view media files (if access is configured for this user).

![image](https://github.com/nix-group/pix/assets/62059273/aa35969a-85f7-49d6-8d7e-44409861e6d2)

In the media files section, you can see your photos and videos stored in the current folder. The total number of files is displayed (if there are more than 50 on the current page, then 50+, 100+, etc. will be indicated).<br/>
There is a view-layout change functionality:

-   Inline
-   Columns
-   Grid

![image](https://github.com/nix-group/pix/assets/62059273/fd5522d7-2ee4-4127-832c-888b8b9406f8)
![image](https://github.com/nix-group/pix/assets/62059273/92bee34d-f4d5-4ae5-8226-88a8e6ab24e0)

When we opened the image, the functionality is available:

-   turning on / off thumbnails (by clicking on them, we can move to the image);
-   switching to full screen mode;
-   starting a slide show;
-   downloading the current image;
-   copying the link to the current image.

It also displays information about the date the file was uploaded to Google Drive and its size.

![image](https://github.com/nix-group/pix/assets/62059273/3fafea58-c9f0-4917-84e0-eccbc6c31271)

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed on your machine. Install `yarn` package manager with the following command `npm i -g yarn`, and then in project folder run `yarn` to download the required dependencies.

Аfter installing the packages, you must create a `.env` file in the root of the project and fill in it according to the template given in the file `.env.example`.

Set up your Google Cloud project: <a href="https://developers.google.com/maps/documentation/android-sdk/cloud-setup" target="_blank">here</a>.

How to Enable Google Drive API on the Google Console: <a href="https://www.cybrosys.com/blog/how-to-enable-google-drive-api-on-the-google-console" target="_blank">here</a>

## Available Scripts

In the project directory, you can run:

– `yarn dev` - runs the app in the development mode.

Open `http://localhost:8080` to view it in the browser. The page will reload if you make edits.

– `yarn build` - builds the app for production to the dist folder.

It optimizes the build for the best performance by minifying JavaScript, CSS, and HTML, resizing and optimizing images and so on. Your app is ready to be deployed!

– `yarn preview` - locally preview production build. You can see what your already built application looks like and correct the errors.

## License

The project is developed by [NIX][1] and distributed under [MIT LICENSE][2]

[1]: https://nixs.com/
[2]: https://raw.githubusercontent.com/nix-group/pix/master/LICENSE
