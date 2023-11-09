const modals = () => {
  function bindModal(
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
    validateTriggerClass = null
  ) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]');

    trigger.forEach(item => {
      item.addEventListener('click', e => {
        if (e.target) {
          e.preventDefault();
        }

        if (validateTriggerClass) {
          const inputFields = modal.querySelectorAll('input');
          let isEmpty = true;
          let isCheckboxEmpty = false;

          switch (inputFields[0].type) {
            case 'text':
              inputFields.forEach(item => {
                const isSomeInputEmpty = [...inputFields].some(
                  item => !item.value
                );

                if (isSomeInputEmpty) {
                  document.querySelector(
                    `.${validateTriggerClass}`
                  ).style.pointerEvents = 'none';
                  document.querySelector(
                    `.${validateTriggerClass}`
                  ).style.opacity = '0.4';
                }

                item.addEventListener('input', () => {
                  const isSomeInputEmpty = [...inputFields].some(
                    item => !item.value
                  );

                  isSomeInputEmpty ? (isEmpty = true) : (isEmpty = false);

                  if (isEmpty) {
                    document.querySelector(
                      `.${validateTriggerClass}`
                    ).style.pointerEvents = 'none';
                    document.querySelector(
                      `.${validateTriggerClass}`
                    ).style.opacity = '0.4';
                  } else {
                    document.querySelector(
                      `.${validateTriggerClass}`
                    ).style.pointerEvents = 'auto';
                    document.querySelector(
                      `.${validateTriggerClass}`
                    ).style.opacity = '1';
                  }
                });
              });
              break;
            case 'checkbox':
              inputFields.forEach(item => {
                if (
                  window.getComputedStyle(item.nextElementSibling, '::before')
                    .content != 'none'
                ) {
                  isCheckboxEmpty = true;
                }
              });

              if (isCheckboxEmpty) {
                document.querySelector(
                  `.${validateTriggerClass}`
                ).style.pointerEvents = 'auto';
                document.querySelector(
                  `.${validateTriggerClass}`
                ).style.opacity = '1';
              } else {
                document.querySelector(
                  `.${validateTriggerClass}`
                ).style.pointerEvents = 'none';
                document.querySelector(
                  `.${validateTriggerClass}`
                ).style.opacity = '0.4';
              }

              inputFields.forEach(item => {
                item.addEventListener('change', () => {
                  document.querySelector(
                    `.${validateTriggerClass}`
                  ).style.pointerEvents = 'auto';
                  document.querySelector(
                    `.${validateTriggerClass}`
                  ).style.opacity = '1';
                });
              });
              break;
          }
        }

        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'block';
        // document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
      });
    });

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = 'none';
      // document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', e => {
      if (e.target == modal && closeClickOverlay) {
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = 'none';
        // document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
      }
    });
  }

  function showModalByTime(selector, time) {
    setTimeout(function () {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, time);
  }

  bindModal(
    '.popup_engineer_btn',
    '.popup_engineer',
    '.popup_engineer .popup_close'
  );
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal(
    '.popup_calc_btn',
    '.popup_calc',
    '.popup_calc_close',
    true,
    'popup_calc_button'
  );
  bindModal(
    '.popup_calc_button',
    '.popup_calc_profile',
    '.popup_calc_profile_close',
    false,
    'popup_calc_profile_button'
  );
  bindModal(
    '.popup_calc_profile_button',
    '.popup_calc_end',
    '.popup_calc_end_close',
    false
  );

  // showModalByTime('.popup', 60000);
};

export default modals;
