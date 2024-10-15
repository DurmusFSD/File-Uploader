const progress = document.getElementById("progress");
const progressValue = document.getElementById("progress-value");

const fileUrl = document.getElementById("file-url");
const uploadButton = document.getElementById("upload-btn");

fileUrl.oninput = () => {
  if (fileUrl.value) {
    (uploadButton.style.background = "#1b5fcc"),
      (uploadButton.style.color = "#fff");
  } else {
    uploadButton.style.background = "#fff";
    uploadButton.style.color = "#000";
  }
};
uploadButton.onclick = async () => {
  if (fileUrl.value) {
    progress.style.width = "0%";
    progressValue.textContent = "0%";
    const response = await fetch(fileUrl.value);
    const blob = await response.blob();
    uploader(blob);
  }
};

const dropArea = document.querySelector(".drop-area");
dropArea.addEventListener("dragover", (e) => e.preventDefault());
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  progress.style.width = "0%";
  progressValue.textContent = "0%";
  uploader(e.dataTransfer.files[0]);
});

const selectFileInput = document.getElementById("file-input");
selectFileInput.addEventListener("change", (e) => {
  progress.style.width = "0%";
  // progressValue.textContent =  "0%";
  uploader(e.target.files[0]);
});

const uploader = (file) => {
  try {
    if (file) {
      const getExtension = (type) => type.split("/").pop().toLowerCase();
      const formData = new FormData();
      if (file.type.startsWith("image/")) {
        formData.append("file", file, "image." + getExtension(file.type));
      } else {
        formData.append("file", file);
      }

      const xhr = new XMLHttpRequest();

      xhr.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          progress.style.width = percentComplete + "%";
          progressValue.textContent = Math.round(percentComplete) + "%";
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          document.querySelector("form").reset();
        }
      });

      xhr.open("POST", " http://localhost:7070/file-upload");
      xhr.send(formData);
    }
  } catch (error) {
    console.error(error);
  }
};
