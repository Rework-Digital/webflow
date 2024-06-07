/* Global updateImageSrc */

// /* Location Images */
// Function to update the image source with the thumbnail URL from the API response
function updateImageSrc(locationId) {
  // Construct the API URL using the provided location ID
  const apiUrlPre = 'https://api.solcast.com.au/media/';
  const apiUrlPost = '?format=json';
  const apiUrl = apiUrlPre + locationId + apiUrlPost;
  // const apiUrl = `https://api.solcast.com.au/media/${locationId}?format=json`;

  // Perform the fetch request to the API
  fetch(apiUrl)
    .then((response) => response.json()) // Parse the JSON from the response
    .then((data) => {
      if (data.files && data.files.length > 0) {
        // Assuming you want the first file's thumbnail URL
        const thumbnailUrl = data.files[0].thumbnail_url;

        // Find the image element by the location ID and update its src attribute
        const imageElement = document.getElementById(locationId);
        if (imageElement) {
          imageElement.src = thumbnailUrl;
          // console.log(`Image src updated to: ${thumbnailUrl}`); // Log the new src URL
        } else {

          // console.error('Image element not found for the provided location ID');
        }
      } else {

        // console.error('No files found in the API response');
      }
    });

  // .catch(error => {
  // console.error('Failed to fetch data from API:', error);
}
