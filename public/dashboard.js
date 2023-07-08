//base api
const base_api = 'https://linkcut-aomz.onrender.com' 

//eventlistener that runs one the page loads to add the user initials and user name to the nav bar and also redirect the user to the login page if not logged in
document.addEventListener('DOMContentLoaded', async function () { 
  await updateProfile();
  await getLinks();
});

//Open and close Create link modal
const newLinkButton = document.getElementById('new-link-button');
const createLinkModal = document.getElementById('create-link-modal');
const closeNewLinkIcon = document.getElementById('createLinkCancel');
const destinationURLInput = document.getElementById('destinationURL')
const backHalfInput = document.getElementById('backHalf')

function openNewLinkModal(){
    createLinkModal.classList.remove('hidden')
    destinationURLInput.focus()
}
newLinkButton.addEventListener('click', openNewLinkModal)

function closeNewLinkModal(){
    if(!createLinkModal.classList.contains('hidden')){
        createLinkModal.classList.add('hidden')
        // closeNewLinkIcon.style.display = 'none'
    }
}
closeNewLinkIcon.addEventListener('click', closeNewLinkModal)





//creating a new link

//Create New Link Form Validation
const createLinkForm = document.getElementById('createLinkForm');

createLinkForm.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Validate destination URL
  const destinationURL = destinationURLInput.value.trim();
  if (destinationURL === '') {
    // Show error message
    showError(destinationURLInput, 'Destination URL is required');
    setTimeout(function () { 
      const errorElement = destinationURLInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  }
 
  
  // Validate back half
  const backHalf = backHalfInput.value.trim();
  if (backHalf !== '' && !isValidBackHalf(backHalf)) {
    // Show error message
    showError(backHalfInput, 'Invalid back half');
    setTimeout(function () { 
      const errorElement = backHalfInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  }
console.log(typeof destinationURL, typeof backHalf)
  const urlData = {
    url: destinationURL,
    slug: backHalf,
  }
  
  //call api to create link
  const data = await createLink(urlData)
  console.log(data)

  if (data.error) { 
    // Show error message
    showError(destinationURLInput, data.error);
    setTimeout(function () { 
      const errorElement = destinationURLInput.nextElementSibling;
      errorElement.textContent = '';
    },2000)
    return;
  } else {
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = `Link created: ${data.newUrl.urlCode}`;
    setTimeout(function () { 
      successMessage.textContent = '';
    }, 2000)
    
    setTimeout(function () {
      closeNewLinkModal()
      //reload the page to show the new link
      location.reload()
    },4000)
  }
});

//function to create a new link
const createLink = async function(urlData) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/urls`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(urlData),
  });
  const data = await response.json();
 
  return data;
}


function isValidURL(url) {
  // Use a regular expression to validate URL format
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

function isValidBackHalf(backHalf) {
  // Use a regular expression to validate back half format
  const backHalfRegex = /^[a-zA-Z0-9-]+$/;
  return backHalfRegex.test(backHalf);
}

function showError(inputElement, errorMessage) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = errorMessage;
}

function clearError(inputElement) {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
}



//Open and close link details modal
const viewDetailsButton = document.getElementById('viewDetailsButton')
const linkDetailsModal = document.getElementById('linkDetailsModal')
const closeLinkDetailsIcon = document.getElementById('closeLinkDetails')

function openLinkDetails(){
    linkDetailsModal.classList.remove('hidden')
}



function closeLinkDetail(){
    if(!linkDetailsModal.classList.contains('hidden')){
        linkDetailsModal.classList.add('hidden')
        // closeNewLinkIcon.style.display = 'none'
    }
}
closeLinkDetailsIcon.addEventListener('click', closeLinkDetail)


//Open and Close Edit Modal Screen
//using event delegation to listen for click events on the linksContainer
const linksContainer = document.getElementById('linksContainer')
linksContainer.addEventListener('click', function (event) { 
  if (event.target.classList.contains('editLinkButton')) {
    openEditLink()
  }
  if(event.target.classList.contains('deleteButton')){
    openDeleteLinkModal()
  }
  if(event.target.classList.contains('viewDetailsButton')){
    openLinkDetails()
  }
})

const editLinkButton = document.getElementById('editLinkButton')
const editLinkModal = document.getElementById('editLinkModal')
const closeEditLinkIcon = document.getElementById('closeEditLinkModal')

function openEditLink() {
    editLinkModal.classList.remove('hidden')
}


function closeEditLink(){
    if(!editLinkModal.classList.contains('hidden')){
        editLinkModal.classList.add('hidden')
    }
}
closeEditLinkIcon.addEventListener('click', closeEditLink)


//Open and close userprofile drop down
const dropdownMenu = document.getElementById('dropdownMenu');
const toggleIcon = document.getElementById('toggleIcon');

function toggleDropdown() {
    dropdownMenu.classList.toggle('hidden');
    toggleIcon.classList.toggle('fa-caret-down');
    toggleIcon.classList.toggle('fa-caret-up');
}

toggleIcon.addEventListener('click', toggleDropdown)


///Open and close change password modal
const changePwdBtn = document.getElementById('changePwdButton')
const changePasswordModal = document.getElementById('changePwdModal')
const closeChangePwdIcon = document.getElementById('closeChangePwd')

function openChangePwdModal(){
  changePasswordModal.classList.remove('hidden')
}
changePwdBtn.addEventListener('click', openChangePwdModal)

function closeChangePwdModal(){
  if(!changePasswordModal.classList.contains('hidden')){
    changePasswordModal.classList.add('hidden')
  }
}
closeChangePwdIcon.addEventListener('click', closeChangePwdModal)



//Open and close delete link modal
const deleteLinkModal = document.getElementById('deleteLinkModal');
const closeDeleteLinkIcon = document.getElementById('closeDeleteLinkModal');
const confirmDeleteLinkBtn = document.getElementById('confirmDeleteLinkBtn');
const cancelDeleteLinkBtn = document.getElementById('cancelDeleteLinkBtn');

function openDeleteLinkModal() {
    deleteLinkModal.classList.remove('hidden');
}

function closeDeleteLinkModal() {
  if(!deleteLinkModal.classList.contains('hidden')){
    deleteLinkModal.classList.add('hidden')
  }
}

// Open the delete link modal when a delete button is clicked
// deleteButton.addEventListener('click', openDeleteLinkModal);

// Close the delete link modal when the close icon is clicked
closeDeleteLinkIcon.addEventListener('click', closeDeleteLinkModal);

// Close the delete link modal when the cancel button is clicked
cancelDeleteLinkBtn.addEventListener('click', closeDeleteLinkModal);

// Handle the delete link operation when the confirm button is clicked
confirmDeleteLinkBtn.addEventListener('click', function() {
    // Add your code here to handle the delete link operation
    // This is just an example, you need to implement your own logic
    console.log('Link deleted!');
    closeDeleteLinkModal();
});


const updateProfile = async function () { 
  //get the current loggedin user from my api
  //get token from local storage
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/auth/profile`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const user = resp.data;
    if(user){
      const userInitials = document.getElementById('userInitials')
      const userName = document.getElementById('userName')
      //get the first letter of the user name
      const firstLetter = user.lastName.charAt(0).toUpperCase()
      //convert the first letter of te firstName and lastName to uppercase  
      const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)
      const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
      const fullName = `${lastName} ${firstName}`
      userInitials.textContent = firstLetter
      userName.textContent = fullName
    } else {
      window.location.href = 'login.html'
    }
}


// const linksContainer = document.getElementById('linksContainer');

//function to get all the urls created by the user and display them on the dashboard
const getLinks = async function () { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/user/clicks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const data = resp.data;
  if (resp.success === true) {
    if (data.total > 0) {
      const links = data.userClicks;
      linksContainer.innerHTML = '';
      createLinks(links);
      //add pagination if the links are more than 9
      if (data.total > 9) {
        //remove the pagination on the page if there are no links
        const paginationContainer = document.getElementById('paginationContainer')
        paginationContainer.classList.remove('hidden')
      }
    } else {
      linksContainer.innerHTML = `
      <div class="no-links">
        <p>You have not created any links yet.</p>
      </div>
    `;
    
    }
  } else {
    window.location.href = 'login.html';
  }
}











//eventlistener that runs when the user clicks on the logout button
const logoutButton = document.getElementById('logoutButton')
  logoutButton.addEventListener('click', async function () {
    //logout the user
    //delete token from local storage
    localStorage.removeItem('token')
    window.location.href = 'login.html'
  });



//function to get all links on a page
const getAllLinks = async function (pageNumber) { 
  const token = localStorage.getItem('token');
  const response = await fetch(`${base_api}/user/clicks?page=${pageNumber}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const resp = await response.json();
  const data = resp.data;
  const lastPage = Math.ceil(data.total / 9)
  if (resp.success === true) {
    return {data, lastPage}
  }
}


//add eventlistener to the pagination buttons
const prevButton = document.getElementById('prevButton')
const nextButton = document.getElementById('nextButton')


//an eventlistener that changes the page number when the user clicks on the next button or prev button and check if the page is the last page or the first page
let pageNumber = 1
if (pageNumber === 1) {
  prevButton.disabled = true
  prevButton.style.cursor = 'not-allowed'
} 



nextButton.addEventListener('click', async function () { 
  pageNumber++
  const {data, lastPage} = await getAllLinks(pageNumber)
  linksContainer.innerHTML = ''
  const links = data.userClicks;
  createLinks(links);

  if (pageNumber === lastPage) {
    // //remove prevButton cursor style
    prevButton.style.cursor = 'pointer'
    prevButton.disabled = false
    nextButton.disabled = true
    nextButton.style.cursor = 'not-allowed'
  } else {
    prevButton.disabled = false
    prevButton.style.cursor = 'pointer'
    nextButton.disabled = false
    nextButton.style.cursor = 'pointer'
  }
  
})


prevButton.addEventListener('click', async function () { 
  pageNumber--
  const {data, lastPage} = await getAllLinks(pageNumber)
  linksContainer.innerHTML = ''
  const links = data.userClicks;
  createLinks(links);
  
  if (pageNumber === 1) {
    prevButton.disabled = true
    prevButton.style.cursor = 'not-allowed'
  }

  if (pageNumber < lastPage) {
    nextButton.disabled = false
    nextButton.style.cursor = 'pointer'
  } else {
    nextButton.disabled = true
    nextButton.style.cursor = 'not-allowed'
  }
})

//function to convert created at date to a readable format with format month day, year
function formatDate(date) { 
  const newDate = new Date(date)
  const month = newDate.toLocaleString('default', { month: 'long' });
  const day = newDate.getDate()
  const year = newDate.getFullYear()
  const formattedDate = `${month} ${day}, ${year}`
  return formattedDate
}

async function createLinks(links) {
  linksContainer.innerHTML = '';
  links.forEach((link) => {
    const linkElement = document.createElement('div');
    linkElement.classList.add('md:w-[30%]', 'w-full', 'h-auto', 'p-[1.25rem]', 'flex', 'flex-col', 'md:gap-[0.75rem]', 'gap-[0.75rem]', 'bg-[#FFF]', 'link-card');
    linkElement.innerHTML = `
    <div class="w-full h-auto flex md:flex-row justify-between gap-[0.5rem] items-center">
      <div class="w-fit h-auto flex flex-row gap-[0.75rem] items-center">
          <a href="#" class="text-center font-['space_grotesk'] md:text-lg text-base font-bold text-[#1A1A19]">${link.urlId.url}</a>
          <i class="fa-regular fa-copy" style="color: #1a1a19;"></i>
      </div>

      <div class="w-fit h-auto flex flex-row gap-[0.8rem]">
          <a <i id="editLinkButton" class=" editLinkButton fa-solid fa-pen cursor-pointer" style="color: #b5b6af;"></i></a>
          <a <i id="deleteButton" class="fa-solid fa-trash cursor-pointer deleteButton" style="color: #b5b6af;"></i></a>
      </div>

    </div>

    <div class="w-full h-auto flex flex-col gap-[0.5rem]">
        <a href="" class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19] underline truncate">${link.urlId.urlCode}</a>
        <p class="text-left font-['space_grotesk'] text-base font-normal text-[#1A1A19]">Created on ${formatDate(link.urlId.created_at)}</p>

        <div class="w-full h-auto flex md:flex-row justify-between gap-[0.5rem] items-center">
            <p>${link.clicks} clicks</p>
            <a <p id="viewDetailsButton" class="viewDetailsButton text-right font-['space_grotesk'] text-base font-bold text-[#525445] underline cursor-pointer">View details</p></a>
        </div>
    </div>
  `;
    linksContainer.appendChild(linkElement);
  });
} 



