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
  const apiUrl = 'https://api.solcast.com.au/media/global?format=json';

  fetch(apiUrl)
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
};

// Call fetchLatestVideoUrl when the document is loaded
document.addEventListener('DOMContentLoaded', fetchLatestVideoUrl);
