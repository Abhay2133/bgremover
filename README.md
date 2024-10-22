# Background Remover App

A simple web application built with Next.js that allows users to upload images and remove their backgrounds using the `@xixiyahaha/rembg-node` library, leveraging Vercel's serverless functions for backend processing.

## Features

- Upload images in various formats (JPEG, PNG, etc.)
- Remove backgrounds from images
- Display the processed image with the background removed

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Vercel Serverless Functions
- **Background Removal**: `@xixiyahaha/rembg-node`

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Clone the Repository

```bash
git clone <repository-url>
cd bg-remover-app
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

## Usage

### Running Locally

To start the development server, run:

```bash
npm run dev
# or
yarn dev
```

Open your browser and go to `http://localhost:3000` to see the app in action.

### Deploying to Vercel

1. Push your code to a Git repository (e.g., GitHub).
2. Connect your repository to Vercel.
3. Follow the deployment instructions provided by Vercel.

## How It Works

1. Users can upload an image through the upload form.
2. The image is sent to the serverless function `/api/remove-bg`.
3. The background removal process is handled by `@xixiyahaha/rembg-node`.
4. The processed image with the background removed is returned and displayed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for production
- [@xixiyahaha/rembg-node](https://www.npmjs.com/package/@xixiyahaha/rembg-node) - Background removal library