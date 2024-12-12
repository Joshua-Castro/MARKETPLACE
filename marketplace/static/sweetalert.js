document.querySelectorAll('.remove-item-btn').forEach(button => {
    button.addEventListener('click', function () {
        const itemName = this.getAttribute('data-item-name');
        const form = this.closest('.remove-form');
        const actionUrl = form.getAttribute('action');

        // SweetAlert confirmation dialog
        Swal.fire({
            title: `Remove "${itemName}"?`,
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove it",
            cancelButtonText: "Cancel"
        }).then(result => {
            if (result.isConfirmed) {
                // Fetch API POST request
                fetch(actionUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 'success') {
                        Swal.fire('Removed!', data.message, 'success').then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire('Error', data.message, 'error');
                    }
                })
                .catch(err => {
                    Swal.fire('Error', 'An unexpected error occurred.', 'error');
                    console.error('Fetch error:', err);
                });
            }
        });
    });
});
