let slideData = [];
let currentIndex = 0;
let iframe = document.getElementById("slideFrame");

async function fetchData() {
  const res = await fetch("https://script.google.com/macros/s/AKfycbx05L2pszrKYsW20NibtZo0ZVXDfNhtrDHoZ6g2w1JU1EhXcpIqGJ22xR9LbEwEM_YMjQ/exec");
  slideData = await res.json();
  showSlide(0); // Start
}

function showSlide(index) {
  if (!slideData.length) return;
  const slide = slideData[index];
  iframe.src = slide.URL;
  const interval = parseInt(slide["Interval (Seconds)"]) || 30;
  // 🔹 Read the "Interval (Seconds)" value from the current slide.
  // 🔹 Use parseInt() to ensure it's a number.
  // 🔹 If missing or invalid, default to 30 seconds.

  setTimeout(() => {
    currentIndex = (index + 1) % slideData.length;
    // 🔹 Move to the next slide in the list.
    // 🔹 If at the last slide, wrap around to the first (circular rotation).
    
    showSlide(currentIndex);
  }, interval * 1000);
    // 🔹 Call the function again to show the next slide.
    // 🔹 Wait for the specified number of seconds (converted to milliseconds)
    // 🔹 Then trigger the next slide display.
}

fetchData();

// 🔄 Auto refresh whole page every 60 minutes (optional)
setInterval(() => location.reload(), 60 * 60 * 1000);
