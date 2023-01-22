const $body = $('body');
const $fileUploadArea = $('.file-upload-area');
const $fileDragOverlay = $('.file-drag-overlay');
const $fileInput = $('#file_uploads');
const fileInput = document.getElementById('file_uploads');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#examples
function returnFileSize(size) {
    if (size < 1024) {
        return `${size} bytes`;
    } else if (size >= 1024 && size < 1048576) {
        return `${(size / 1024).toFixed(1)} KB`
    } else if (size >= 1048576) {
        return `${(size / 1048576).toFixed(1)} MB`;
    }
}

function clearFilesList() {
    $('.uploaded-files-list').remove();
}

// https://stackoverflow.com/questions/3144419/how-do-i-remove-a-file-from-the-filelist
function removeFileFromInput(index) {
    const files = fileInput.files;
    const dataTransfer = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
        if (i !== index) {
            dataTransfer.items.add(files[i]);
        }
    }

    fileInput.files = dataTransfer.files;

    console.log(files, fileInput.files);
}

function displayAddedFiles() {
    clearFilesList();

    const currentFiles = fileInput.files;

    if (currentFiles.length > 0) {
        const $filesList = $('<ol class="uploaded-files-list"></ol>');

        for (const file of currentFiles) {
            const $fileIcon = $('<span><i class="fa-solid fa-file"></i><span>');
            const $fileName = $('<span>' + file.name + '</span>');
            const $fileSize = $('<span>' + returnFileSize(file.size) + '</span>');
            const $fileRemoveIcon = $('<span class="remove-file"><i class="fa-solid fa-xmark"></i><span>');
            const $fileItem = $('<li></li>');

            $fileItem.append($fileIcon);
            $fileItem.append($fileName);
            $fileItem.append($fileSize);
            $fileItem.append($fileRemoveIcon);
            $filesList.append($fileItem);

            $fileRemoveIcon.click(function() {
                const $item = $(this).parent();
                const itemIndex = parseInt($item.index());
                
                removeFileFromInput(itemIndex);
                
                $item.remove();
            });
        }

        $('.uploaded-files').append($filesList);
    }
}

function addDraggingFileClass() {
    $body.addClass('dragging-file');
    $fileDragOverlay.addClass('dragging-file');
}

function removeDraggingFileClass() {
    $body.removeClass('dragging-file');
    $fileDragOverlay.removeClass('dragging-file');
}

// https://stackoverflow.com/a/5967981/4416259
$fileUploadArea.click(function(event) {
    if (! $(event.target).is('#file_uploads')) {
        $('#file_uploads').trigger('click');
    }
});

// https://stackoverflow.com/a/9545050/4416259
// https://www.htmlgoodies.com/javascript/drag-files-into-the-browser-from-the-desktop-using-jquery-event-binding/
$fileUploadArea.on('dragenter dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();

    addDraggingFileClass();
});

$fileDragOverlay.on('dragenter dragover', function(event) {
    event.preventDefault();
    event.stopPropagation();
});

$fileDragOverlay.on('dragleave', function(event) {
    removeDraggingFileClass();
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

    removeDraggingFileClass();
});

$fileInput.change(function() {
    const currentFiles = fileInput.files;

    displayAddedFiles();
});