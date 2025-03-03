const dropArea = document.getElementById("dropArea");
        const fileInput = document.getElementById("fileInput");
        const uploadContainer = document.getElementById("uploadContainer");
        const previewContainer = document.getElementById("previewContainer");
        const previewImg = document.getElementById("previewImg");
        const progressBar = document.getElementById("progressBar");
        const progress = document.getElementById("progress");
        const signatureContainer = document.getElementById("signatureContainer");
        const signatureCanvas = document.getElementById("signatureCanvas");
        let ctx = signatureCanvas.getContext("2d");

        let drawing = false;

        // Prevent default drag behaviors
        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, (e) => e.preventDefault(), false);
            uploadContainer.addEventListener(eventName, (e) => e.preventDefault(), false);
        });

        // Highlight drop area when file is dragged over
        ["dragenter", "dragover"].forEach(eventName => {
            dropArea.addEventListener(eventName, () => uploadContainer.classList.add("dragover"), false);
        });

        ["dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, () => uploadContainer.classList.remove("dragover"), false);
        });

        // Handle file drop
        dropArea.addEventListener("drop", (e) => {
            let files = e.dataTransfer.files;
            handleFiles(files);
        });

        // Handle file selection via click
        dropArea.addEventListener("click", () => fileInput.click());
        fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];

                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        previewImg.src = reader.result;
                        previewContainer.style.display = "block";
                        signatureContainer.style.display = "block";
                        startFakeUpload();
                        setTimeout(setupCanvas, 300); // Ensures image is loaded before setting canvas
                    };
                } else {
                    alert("Please upload a valid image file.");
                }
            }
        }

        function startFakeUpload() {
            progressBar.style.display = "block";
            progress.style.width = "0%";

            let width = 0;
            const interval = setInterval(() => {
                width += 10;
                progress.style.width = width + "%";
                if (width >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        progressBar.style.display = "none";
                    }, 500);
                }
            }, 300);
        }

        function setupCanvas() {
            signatureCanvas.width = previewImg.clientWidth;
            signatureCanvas.height = previewImg.clientHeight;
            ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";

            // Reset event listeners to avoid duplication
            signatureCanvas.onmousedown = startDrawing;
            signatureCanvas.onmousemove = draw;
            signatureCanvas.onmouseup = stopDrawing;
            signatureCanvas.onmouseout = stopDrawing;
        }

        function startDrawing(e) {
            drawing = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        }

        function draw(e) {
            if (!drawing) return;
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        }

        function stopDrawing() {
            drawing = false;
        }

        document.getElementById("clearSignature").addEventListener("click", () => {
            ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
        });

        document.getElementById("saveImage").addEventListener("click", () => {
            const combinedCanvas = document.createElement("canvas");
            combinedCanvas.width = signatureCanvas.width;
            combinedCanvas.height = signatureCanvas.height;
            const combinedCtx = combinedCanvas.getContext("2d");

            combinedCtx.drawImage(previewImg, 0, 0, signatureCanvas.width, signatureCanvas.height);
            combinedCtx.drawImage(signatureCanvas, 0, 0);

            const link = document.createElement("a");
            link.href = combinedCanvas.toDataURL("image/png");
            link.download = "signed-image.png";
            link.click();
        });