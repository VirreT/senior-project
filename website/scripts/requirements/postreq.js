//--------------------------------------------------------------
// Post Requirements
// Template to validate a post
//--------------------------------------------------------------
/*
// Title Validation
function checkTitleReq(postTitle) {
    // Sanitize input to prevent injection attacks
    function sanitizeInput(postTitle) {
        return postTitle.replace(/\\/g, "\\\\")  
                        .replace(/'/g, "\\'")    
                        .replace(/"/g, '\\"');   
    }

    // Check for forbidden patterns in the title
    function isSafepostTitle(postTitle) {
        const forbiddenPatterns = [
            /--/,          
            /;/,           
            /xp_cmdshell/, 
            /\b(SELECT|INSERT|DELETE|DROP|UPDATE|ALTER|CREATE|EXEC|UNION|OR|AND)\b/i 
        ];

        return !forbiddenPatterns.some(pattern => pattern.test(postTitle));
    }

    // Validate title
    if (!postTitle || postTitle.trim() === "") {
        console.log("Please enter a restaurant name");
        return false;
    }

    if (postTitle.length > 40) {
        console.log("Restaurant name must be less than 40 characters long");
        return false;
    }

    postTitle = sanitizeInput(postTitle);

    if (!isSafepostTitle(postTitle)) {
        console.log("The restaurant name contains forbidden patterns");
        return false;
    }

    console.log(postTitle.toLowerCase());
    return true;
}

// Bio Validation
function checkBioReq(postBio) {
    if (!postBio || postBio.trim() === "") {
        console.log("Please enter a bio");
        return false;
    }
    else if (postBio.length > 250) {
        console.log("Bio must be less than 250 characters long");
        return false;
    }
    else {
        return true;
    }
}

// Rating Validation
function checkRatingReq(rating) {
    if (!rating || rating.trim() === "") {
        console.log("Please enter a rating");
        return false;
    }
    else if (rating >= 1 && rating <= 5) {
        return true;
    } else {
        console.log("Rating must be between 1 and 5");
        return false;
    }
}

// Link Validation
function checkLinkReq(link) {
    if (!link || link.trim() === "") {
        console.log("Please enter a link");
        return false;
    }
    else if (!link.includes("google.com/maps/place/")) {
        console.log("Please enter a valid Google Maps link");
        return false;
    }
    else {
        return true;
    }
}

// Example variables for testing
const postTitle = "McDonald's";
const postBio = "A popular fast-food chain.";
const rating = 4;
const link = "https://www.google.com/maps/place/McDonald's";

// Example usage
checkTitleReq(postTitle); 
checkBioReq(postBio);
checkRatingReq(rating);
checkLinkReq(link);
*/