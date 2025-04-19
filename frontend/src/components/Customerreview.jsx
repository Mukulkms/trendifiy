import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from 'react-icons/fa';

const CustomerReviewsCarousel = () => {
  const reviews = [
    {
      rating: 5,
      category: 'Product Quality!',
      comment: '"I absolutely love shopping here! The selection is fantastic, the prices are competitive. Highly recommend."',
      customerName: 'Wade Warren',
      customerTitle: 'Customer',
      customerImage: 'https://via.placeholder.com/40/F08080/FFFFFF?Text=WW', // Placeholder image
    },
    {
      rating: 4,
      category: 'Delivery Services!',
      comment: '"I had a great experience shopping on this website. The interface is user-friendly, making it easy to find what I need."',
      customerName: 'Kristin Watson',
      customerTitle: 'Customer',
      customerImage: 'https://via.placeholder.com/40/FFA07A/FFFFFF?Text=KW', // Placeholder image
    },
    {
      rating: 5,
      category: 'Product Price!',
      comment: '"I\'m so impressed with the level of customer service I received. I had an issue with my order, and the support team was incredibly helpful!"',
      customerName: 'Esther Howard',
      customerTitle: 'Designer',
      customerImage: 'https://via.placeholder.com/40/ADD8E6/000000?Text=EH', // Placeholder image
    },
    {
      rating: 5,
      category: 'Amazing Experience!',
      comment: '"The quality of the products exceeded my expectations. Fast shipping and excellent support."',
      customerName: 'Jane Doe',
      customerTitle: 'Happy Shopper',
      customerImage: 'https://via.placeholder.com/40/8FBC8F/FFFFFF?Text=JD', // Placeholder image
    },
    {
      rating: 4,
      category: 'Great Value!',
      comment: '"I found exactly what I was looking for at a great price. Will definitely shop here again."',
      customerName: 'Peter Jones',
      customerTitle: 'Value Seeker',
      customerImage: 'https://via.placeholder.com/40/4682B4/FFFFFF?Text=PJ', // Placeholder image
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`inline-block mr-1 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl  text-gray-800 text-center mb-2">Customers Review</h2>
        <p className="text-center text-gray-500 mb-8">Share information about your brand with your customers.</p>
        <Carousel responsive={responsive} infinite autoPlay arrows={false} className="pb-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between mx-2"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">{review.category}</h3>
                <div className="mb-2">{renderStars(review.rating)}</div>
                <p className="text-gray-600 italic mb-4">{review.comment}</p>
              </div>
              <div className="flex items-center mt-4">
                <div className="rounded-full overflow-hidden w-10 h-10 mr-3">
                  <img
                    src={review.customerImage}
                    alt={review.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{review.customerName}</p>
                  <p className="text-xs text-gray-500">{review.customerTitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default CustomerReviewsCarousel;