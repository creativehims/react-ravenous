require('dotenv').config();

const apiKey = process.env.REACT_APP_API_KEY;

const Yelp = {
  async search(term, location, sortBy) {
    try {
      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.filter(Boolean).map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default Yelp;
