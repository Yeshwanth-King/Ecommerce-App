# E-Commerce Website

This repository contains the code for a full-stack e-commerce web application. The project is built using modern technologies and frameworks to deliver a responsive, fast, and user-friendly shopping experience. The application includes both an admin panel for product and order management and a frontend for customer interaction.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [Frontend](#frontend)
- [Authentication](#authentication)
- [Image Storage](#image-storage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Responsive Design**: The application is designed to be mobile-friendly and responsive across various devices.
- **Admin Panel**: Allows administrators to manage products, categories, and orders.
- **Authentication**: Google and GitHub login integration using NextAuth.js.
- **Image Storage**: Amazon Cloud Service (AWS S3) for secure and scalable image storage.
- **Product Search and Filtering**: Search products by category, price, or keywords.
- **Cart and Checkout**: Secure and seamless checkout process with Stripe integration.
- **Order Management**: Admins can view and update order statuses, and customers can view their order history.

---

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Authentication**: NextAuth.js with Google and GitHub providers
- **Image Storage**: Amazon AWS S3 for storing product images
- **Payment Gateway**: Stripe API for handling payments
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Deployment**: Vercel, AWS

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Yeshwanth-R/e-commerce-website.git
   cd e-commerce-website
   ```

2. **Change directory (Frontend or Admin panel):**

```bash
    cd .\ecommerce-admin-panel\

    # or

    cd .\ecommerce-frontend\
```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   Create a `.env.local` file in the root directory with the following keys:

   ```bash
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   AWS_BUCKET_NAME=your-s3-bucket-name
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

5. **Run the development server:**

   Once you've set up the environment variables, you can run the development server with:

   ```bash
   npm run dev
   ```

   This will start the application at `http://localhost:3000`.

---

## Usage

### Admin Panel

- Access the admin panel by navigating to `/admin`.
- Admin users can sign in using Google or GitHub OAuth.
- Key functionalities include:
  - **Product Management**: Add, update, and delete products.
  - **Order Management**: View, update, and manage customer orders.
  - **Category Management**: Add or update product categories.

### Frontend

- Customers can browse through products, add them to the cart, and proceed to checkout using Stripe for payments.
- Login is required to complete a purchase. OAuth options include Google and GitHub.

* Users can browse products, add items to the cart, and complete purchases using Stripe as the payment gateway.
* Authentication via Google or GitHub is required to proceed with the checkout process.

---

## Authentication

This project integrates **NextAuth.js** for authentication, supporting both Google and GitHub OAuth providers. The following environment variables are required:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

For more detailed configuration, refer to [NextAuth.js documentation](https://next-auth.js.org/getting-started/introduction).

---

## Payment Integration

The checkout process is powered by **Stripe**, enabling secure payments for customers. Ensure that your environment includes the Stripe secret key:

```bash
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## For more on configuring Stripe, [visit Stripe API documentation.](https://docs.stripe.com/api)

## Image Storage

Product images and other media files are stored in Amazon AWS S3. This ensures secure and scalable storage. The following environment variables are needed to configure AWS S3:

```bash
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_BUCKET_NAME=your-s3-bucket-name
```

Make sure to set up your AWS S3 bucket and provide the correct environment variables.

---

## Contributing

Contributions are welcomed! If you encounter issues or have feature suggestions, feel free to open a pull request or create an issue. Please make sure to follow the contribution guidelines before submitting.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

```

```
