let employeeList;

/**
 * Gets random number of employees from the API
 * @param {number} employeesCount
 */
function getEmployees(employeesCount = 1) {
  return fetch(`https://randomuser.me/api/?results=${employeesCount}`)
    .then((res) => res.json())
    .then((res) => res.results)
    .catch((err) => console.error(err));
}

/**
 * Renders in the gallery cards of employees
 * @param {array} employeeList
 */
function renderEmployeesCard(employeeList) {
  const gallery = document.getElementById("gallery");

  employeeList.forEach((employee, index) => {
    const {
      picture: { large: image },
      email,
      name: { first, last },
      location: { city, state },
    } = employee;

    gallery.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card" onclick="renderModal(${index})">
            <div class="card-img-container">
                <img class="card-img" src="${image}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${first} ${last}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
    `
    );
  });
}

/**
 * Renders the search bar
 */
function renderSearchBar() {
  const container = document.querySelector(".search-container");

  container.insertAdjacentHTML(
    "beforeend",
    `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `
  );
}

/**
 * Removes the modal
 */
function removeModal() {
  const modal = document.querySelector(".modal-container");
  if (modal) modal.remove();
}

/**
 * Renders the information of the employee in the modal box
 * @param {number} employeeIndex
 */
function renderModal(employeeIndex) {
  const employee = employeeList[employeeIndex];
  const gallery = document.getElementById("gallery");
  removeModal();

  const {
    picture: { large: image },
    email,
    phone,
    name: { first, last },
    location: { street, city, state, postcode },
    dob: { date },
  } = employee;

  gallery.insertAdjacentHTML(
    "afterend",
    `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="removeModal()"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${image}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${first} ${last}</h3>
                    <p class="modal-text">${email}</p>
                    <p class="modal-text cap">${city}</p>
                    <hr>
                    <p class="modal-text">${phone}</p>
                    <p class="modal-text">${street.number} ${
      street.name
    }, ${city}, ${state} ${postcode}</p>
                    <p class="modal-text">Birthday: ${new Date(
                      date
                    ).toDateString()}</p>
                </div>
            </div>

            <div class="modal-btn-container">
                ${
                  employeeIndex !== 0
                    ? `<button type="button" id="modal-prev" class="modal-prev btn" onclick="renderModal(${
                        employeeIndex - 1
                      })">Prev</button>`
                    : ""
                }
                ${
                  employeeIndex !== employeeList.length - 1
                    ? `<button type="button" id="modal-next" class="modal-next btn" onclick="renderModal(${
                        employeeIndex + 1
                      })">Next</button>`
                    : ""
                }
            </div>
        </div>
    `
  );
}

/**
 * Starting point
 */
async function init() {
  employeeList = await getEmployees(12);

  if (Array.isArray(employeeList)) {
    renderSearchBar();
    renderEmployeesCard(employeeList);
  }
}

init();
