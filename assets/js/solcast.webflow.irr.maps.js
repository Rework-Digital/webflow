/* Global updateImageSrc */

// Function to fetch the video URL and update the video element
function fetchLatestVideoUrl() {
  // Get the div element with class mapEmbed
  const mapEmbedDiv = document.querySelector('.mapembed');
  if (!mapEmbedDiv) {
    return;
  }

  // Extract the ID from the div
  // const mapId = mapEmbedDiv.id;
  // Define the API URL
  const globalUrl = 'https://api.solcast.com.au/media/global?format=json';

  fetch(globalUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (!data || !data.files || !data.files.length) {
        return;
      }

      // Initialize variables to track the latest date and corresponding video URL
      let latestDate = new Date(0); // Epoch date
      let videoUrl = '';

      // Iterate through each file entry to find the latest date
      data.files.forEach((file) => {
        const fileDate = new Date(file.id); // Assuming 'id' holds the date in YYYY-MM-DD format
        if (fileDate > latestDate) {
          latestDate = fileDate;
          videoUrl = file.video_url; // Update video URL if this entry has the latest date
        }
      });

      // Update the date display
      const dateElement = document.getElementById('mapDate');
      dateElement.setAttribute('data-date', latestDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }));

      // Check if there is a video element with class 'hero_video' and update its 'src'
      const videoElement = document.querySelector('.hero_video');
      if (videoElement) {
        videoElement.src = videoUrl;
        videoElement.load();
      }
    });
}


// /* Location Images */
// // Function to update the image source with the thumbnail URL from the API response
// function updateImageSrc(locationId) {
//   // Construct the API URL using the provided location ID
//   const apiUrlPre = 'https://api.solcast.com.au/media/';
//   const apiUrlPost = '?format=json';
//   const apiUrl = apiUrlPre + locationId + apiUrlPost;

//   // Perform the fetch request to the API
//   fetch(apiUrl)
//     .then((response) => response.json()) // Parse the JSON from the response
//     .then((data) => {
//       if (data.files && data.files.length > 0) {
//         // Assuming you want the first file's thumbnail URL
//         const thumbnailUrl = data.files[0].thumbnail_url;

//         // Find the image element by the location ID and update its src attribute
//         const imageElement = document.getElementById(locationId);
//         if (imageElement) {
//           imageElement.src = thumbnailUrl;
//           // console.log(`Image src updated to: ${thumbnailUrl}`); // Log the new src URL
//         } else {
//           // console.error('Image element not found for the provided location ID');
//         }
//       } else {
//         // console.error('No files found in the API response');
//       }
//     });

//   // .catch((error) => {
//   // console.error('Failed to fetch data from API:', error);
// }

/* Move Glabal Card to First Position */
// Function to add a class to a div with a specific custom attribute value
function addClassToDiv() {
  // Find the div with the custom attribute cardid="global"
  const divElement = document.querySelector('div[cardid="global"]');

  // Check if the div exists
  if (divElement) {
    // Add the class 'layout-first-item' to the div
    divElement.classList.add('layout-first-item');
    console.log('Class added successfully.');
  } else {
    // Log a message if no such div was found
    console.error('No div found with cardid="global"');
  }
}
