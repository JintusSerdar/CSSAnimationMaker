# Shapemate: CSS Shape Animation Generator

## Overview

Shapemate is a CSS generator designed to simplify the creation of aesthetic, dynamic shapes using only CSS. The project aims to provide an easy-to-use experimental environment for users unfamiliar with CSS, making the process of creating animations more accessible. By leveraging Flask, Javascript, CSS, HTML, and SQL, Shapemate enables users to generate unique shapes and animations effortlessly.

## Features

### 1. Modern and User-Friendly UI

Shapemate boasts a modern and visually appealing user interface, catering to developers and designers. The UI is designed to be clean and intuitive, with closable menus to focus on the created shape without unnecessary distractions.

### 2. Dynamic Shapes with CSS Animations

One of the standout features of Shapemate is the ability to create dynamic shapes. Users can easily modify shapes dynamically by incorporating a small amount of JavaScript code. For example, adjusting properties like `--transformOriginY` based on user actions can dramatically alter the shape. The smooth transitions provided by CSS animations enhance the overall user experience.

```javascript
   "yourAnimation".style.setProperty('--transformOriginY', '-16.5px');
   ```

### 3. Fast and Efficient

Shapemate utilizes CSS animations instead of traditional GIFs or videos, eliminating loading times commonly associated with multimedia elements. This results in a faster and more responsive user experience when implementing shapes and animations on websites.

### 4. Save System and User Login

To enhance user experience, Shapemate includes a save system and user login functionality. Users can create accounts to save their shapes within the program, ensuring that their work is preserved for future sessions.

## Usage Instructions

To use Shapemate, follow these steps:

1. Open the Shapemate website (currently not available to the public).
2. Create a shape by adjusting settings in the menu.
3. Download the generated CSS file for your shape.

## Testing and Performance

Shapemate has been tested by creating various websites, receiving positive feedback from developers. While the performance is satisfactory, future optimizations are planned based on user demand.

## Challenges and Lessons Learned

During development, efforts were focused on improving JavaScript and CSS skills. Challenges were encountered with Flask libraries, leading to a decision to use more readymade packages in future projects. The experience gained will be valuable when transitioning to frameworks like React.

## Future Enhancements

Future updates for Shapemate include:

- Addition of more settings for creating diverse shapes.
- Optimization for improved efficiency.
- Development of a main project page with a detailed user guide.

