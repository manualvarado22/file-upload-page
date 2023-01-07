const $fileUploadArea = $('.file-upload-area');
const $fileDragOverlay = $('.file-drag-overlay');
const $fileInput = $('#file');
const fileInput = document.getElementById('file');

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

    $(this).css('display', 'none');
});

$fileInput.on('change', function(event) {
    console.log(event.originalEvent.dataTransfer.files);
});