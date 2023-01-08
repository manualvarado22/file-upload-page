const $fileUploadArea = $('.file-upload-area');
const $fileDragOverlay = $('.file-drag-overlay');
const $fileInput = $('#file');
const fileInput = document.getElementById('file');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#examples
function returnFileSize(size) {
    if (size < 1024) {
        return `${number} bytes`;
    } else if (size >= 1024 && size < 1048576) {
        return `${(size / 1024).toFixed(1)} KB`
    } else if (size >= 1048576) {
        return `${(size / 1048576).toFixed(1)} MB`;
    }
}

function removeFilesList() {
    $('.uploaded-files-list').remove();
}

function displayAddedFiles() {
    removeFilesList();

    const currentFiles = fileInput.files;

    if (currentFiles.length > 0) {
        const $filesList = $('<ol class="uploaded-files-list"></ol>');

        for (const file of currentFiles) {
            const $fileIcon = $('<span><i class="fa-solid fa-file"></i><span>');
            const $fileName = $('<span>' + file.name + '</span>');
            const $fileSize = $('<span>' + returnFileSize(file.size) + '</span>');
            const $fileRemoveIcon = $('<span><i class="fa-solid fa-xmark remove-file"></i><span>');
            const $fileItem = $('<li></li>');

            $fileItem.append($fileIcon);
            $fileItem.append($fileName);
            $fileItem.append($fileSize);
            $fileItem.append($fileRemoveIcon);
            $filesList.append($fileItem);
        }

        $('.uploaded-files').append($filesList);
    }
}

// https://stackoverflow.com/a/5967981/4416259
$fileUploadArea.click(function(event) {
    if (! $(event.target).is('#file')) {
        $('#file').trigger('click');
    }
});

// https://stackoverflow.com/a/9545050/4416259
// https://www.htmlgoodies.com/javascript/drag-files-into-the-browser-from-the-desktop-using-jquery-event-binding/
$fileUploadArea.on('dragenter dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();

    $fileDragOverlay.css('display', 'block');
    // console.log('Drag enter and Drag over');
});

$fileDragOverlay.on('dragenter dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
});

$fileDragOverlay.on('dragleave', function(event) {
    $fileDragOverlay.css('display', 'none');
});

$fileUploadArea.on('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();

    fileInput.files = event.originalEvent.dataTransfer.files;
});

$fileDragOverlay.on('drop', function(event) {
    event.preventDefault();
    event.stopPropagation();

    fileInput.files = event.originalEvent.dataTransfer.files;
    $fileInput.trigger('change');

    $(this).css('display', 'none');
});

$fileInput.change(function() {
    const currentFiles = fileInput.files;

    // console.log(currentFiles[0]);

    displayAddedFiles();
});