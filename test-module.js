const mainList = document.querySelector(".main-list")
const mainInp = document.querySelector('main-inp')
const nextButton = document.querySelector(".button-next-10-posts")
const previousButton = document.querySelector(".button-previous-10-posts")
let arr = JSON.parse(localStorage.getItem("arr")) || []
let InpVal = "";
let input = null;
let counter = 1;

window.onload = init = async () => {
  input = document.querySelector(".main-inp");
  input.addEventListener("keydown", upDatevalue);
  const resp = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10", {
    method: "GET",
  });
  const result = await resp.json();
  arr = result;
  DoIt();
};

const DoIt = () => {
  while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
  }
  arr.map((item, index) => {
    const { userId, id, title,  body } = item;

    const newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    mainList.appendChild(newMain);

    const postButtonContainer = document.createElement("div");
    postButtonContainer.className = 'post-button-container'
    newMain.appendChild(postButtonContainer);

    const deleteButton = document.createElement("div");
    deleteButton.className = 'delete-button'
    deleteButton.id = `numberPost-${index}`;
    deleteButton.addEventListener('click', () => deletePost(id))
    deleteButton.innerHTML = `delete`;
    postButtonContainer.appendChild(deleteButton);

    const numberPost = document.createElement("div");
    numberPost.className = 'numberPost'
    numberPost.id = `numberPost-${index}`;
    numberPost.innerHTML = `Пост № ${id}`;
    newMain.appendChild(numberPost);

    const userTitle = document.createElement("div");
    userTitle.className = 'userTitle'
    userTitle.id = `userTitle-${index}`;
    userTitle.innerHTML = title;
    newMain.appendChild(userTitle);

    const userBody = document.createElement("div");
    userBody.id = `userBody-${index}`;
    userBody.className = 'userBody'
    userBody.innerHTML = body;
    newMain.appendChild(userBody);
  });
};

const Filtr = (el) => {
  return (
    el.title.toLowerCase().indexOf(InpVal.toLowerCase()) > -1 ||
    el.body.toLowerCase().indexOf(InpVal.toLowerCase()) > -1
  );
};

const upDatevalue = (event) => {
  InpVal = event.target.value;
  input.addEventListener("keyup", findPosts);
}

const findPosts = (event) => {
  InpVal = event.target.value;

  while (mainList.firstChild) {
    mainList.removeChild(mainList.firstChild);
  }
  
  arr.filter((el) => Filtr(el)).map((item, index) => {
    const { userId, id, title,  body } = item;
    const newMain = document.createElement("div");
    newMain.className = "main-str";
    newMain.id = `main-str-${index}`;
    mainList.appendChild(newMain);

    const postButtonContainer = document.createElement("div");
    postButtonContainer.className = 'post-button-container'
    newMain.appendChild(postButtonContainer);

    const deleteButton = document.createElement("div");
    deleteButton.className = 'delete-button'
    deleteButton.id = `numberPost-${index}`;
    deleteButton.innerHTML = `delete`;
    postButtonContainer.appendChild(deleteButton);

    const numberPost = document.createElement("div");
    numberPost.className = 'numberPost'
    numberPost.id = `numberPost-${index}`;
    numberPost.innerHTML = `Пост № ${id}`;
    newMain.appendChild(numberPost);

    const userTitle = document.createElement("div");
    userTitle.className = 'userTitle'
    userTitle.id = `userTitle-${index}`;
    userTitle.innerHTML = title;
    newMain.appendChild(userTitle);

    const userBody = document.createElement("div");
    userBody.id = `userBody-${index}`;
    userBody.className = 'userBody'
    userBody.innerHTML = body;
    newMain.appendChild(userBody);
  })
}

const showNextPosts = async () => {
  counter++;
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${counter}`, {
    method: "GET",
  });
  const result = await resp.json();
  arr = result;
  DoIt();
}

nextButton.addEventListener('click', showNextPosts)

const showPreviousPosts = async () => {
  counter--;
  const resp = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${counter}`, {
    method: "GET",
  });
  const result = await resp.json();
  arr = result;
  DoIt();
}

previousButton.addEventListener('click', showPreviousPosts)

async function deletePost(id) {
  const resp = await fetch(
    `https://jsonplaceholder.typicode.com/posts/1`,
    {
      method: "DELETE",
    }
  );
  const result = await resp.json();
  console.log(resp); //приходит статус 200
  DoIt();
};