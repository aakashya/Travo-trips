import './bootstrap';

const farePerSeat = 6999;

const icons = {
    play: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 5 11 7-11 7Z"/></svg>',
    pause: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5v14"/><path d="M16 5v14"/></svg>',
    plus: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-[3px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
    minus: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 stroke-[3px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    spinner: '<span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>',
    download: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    sparkles: '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 14 9l6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="M19 3v4"/><path d="M21 5h-4"/></svg>',
};

function queryAll(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
}

function setHidden(element, hidden, displayClass = null) {
    if (!element) {
        return;
    }

    element.hidden = hidden;
    if (displayClass) {
        element.classList.toggle(displayClass, !hidden);
    }
}

function formatCurrency(value) {
    return Number(value).toLocaleString('en-IN');
}

function initSmoothScroll() {
    queryAll('[data-scroll-target]').forEach((button) => {
        button.addEventListener('click', () => {
            const target = document.querySelector(button.dataset.scrollTarget);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initHeroParallax() {
    const hero = document.getElementById('hero-parallax');
    if (!hero) {
        return;
    }

    window.addEventListener('mousemove', (event) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        hero.style.transform = `translate(${x * 12}px, ${y * 12}px) scale(1.06)`;
    });
}

function initBookingModal() {
    const modal = document.getElementById('booking-modal');
    const form = document.querySelector('[data-booking-form]');
    const successPanel = document.querySelector('[data-booking-success]');

    if (!modal || !form || !successPanel) {
        return;
    }

    const state = {
        seats: 1,
        appliedPromo: '',
        discount: 0,
        generatedPass: '',
        isSubmitting: false,
    };

    const seatCount = queryAll('[data-seat-count]');
    const seatCountInline = document.querySelector('[data-seat-count-inline]');
    const subtotal = document.querySelector('[data-subtotal]');
    const discountInline = document.querySelector('[data-discount-inline]');
    const discountText = document.querySelector('[data-discount]');
    const discountRow = document.querySelector('[data-discount-row]');
    const netTotal = document.querySelector('[data-net-total]');
    const promoSuccess = document.querySelector('[data-promo-success]');
    const promoCodeText = document.querySelector('[data-promo-code]');
    const promoError = document.querySelector('[data-promo-error]');
    const promoErrorText = document.querySelector('[data-promo-error-text]');
    const submitButton = document.querySelector('[data-submit-booking]');
    const submitIcon = document.querySelector('[data-submit-icon]');
    const submitLabel = document.querySelector('[data-submit-label]');

    function recalculateDiscount() {
        if (state.appliedPromo === 'TRAVO1000') {
            state.discount = state.seats * 1000;
        } else if (state.appliedPromo === 'MOUNTAINLOVE') {
            state.discount = Math.round(state.seats * farePerSeat * 0.1);
        } else {
            state.discount = 0;
        }
    }

    function updateReceipt() {
        recalculateDiscount();
        const subTotalValue = state.seats * farePerSeat;
        const netValue = Math.max(1, subTotalValue - state.discount);

        seatCount.forEach((node) => {
            node.textContent = state.seats;
        });

        if (seatCountInline) {
            seatCountInline.textContent = state.seats;
        }
        if (subtotal) {
            subtotal.textContent = formatCurrency(subTotalValue);
        }
        if (discountText) {
            discountText.textContent = formatCurrency(state.discount);
        }
        if (discountInline) {
            discountInline.textContent = formatCurrency(state.discount);
        }
        if (netTotal) {
            netTotal.textContent = formatCurrency(netValue);
        }

        setHidden(discountRow, state.discount <= 0, 'flex');

        if (promoSuccess && promoCodeText) {
            promoCodeText.textContent = state.appliedPromo;
            setHidden(promoSuccess, !state.appliedPromo, 'flex');
        }
    }

    function setPromoError(message = '') {
        if (!promoError || !promoErrorText) {
            return;
        }

        promoErrorText.textContent = message;
        setHidden(promoError, !message, 'flex');
    }

    function resetSubmitState() {
        state.isSubmitting = false;
        if (submitButton) {
            submitButton.disabled = false;
        }
        if (submitIcon) {
            submitIcon.innerHTML = icons.sparkles;
        }
        if (submitLabel) {
            submitLabel.textContent = 'CONFIRM & GENERATE EXPEDITION TICKET';
        }
    }

    function openModal() {
        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
        setTimeout(() => form.querySelector('input[name="fullName"]')?.focus(), 50);
    }

    function closeModal() {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
    }

    queryAll('[data-open-booking]').forEach((button) => {
        button.addEventListener('click', openModal);
    });

    queryAll('[data-close-booking]').forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    queryAll('[data-seat-delta]').forEach((button) => {
        button.addEventListener('click', () => {
            const delta = Number(button.dataset.seatDelta || 0);
            state.seats = Math.max(1, Math.min(10, state.seats + delta));
            setPromoError('');
            updateReceipt();
        });
    });

    document.querySelector('[data-apply-promo]')?.addEventListener('click', () => {
        const input = form.querySelector('input[name="promoCode"]');
        const code = input?.value.trim().toUpperCase() || '';

        setPromoError('');
        if (!code) {
            setPromoError('Enter a code first.');
            return;
        }

        if (code === 'TRAVO1000' || code === 'MOUNTAINLOVE') {
            state.appliedPromo = code;
            updateReceipt();
            return;
        }

        state.appliedPromo = '';
        updateReceipt();
        setPromoError("Invalid code. Try 'TRAVO1000' or 'MOUNTAINLOVE'.");
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (state.isSubmitting || !form.reportValidity()) {
            return;
        }

        state.isSubmitting = true;
        if (submitButton) {
            submitButton.disabled = true;
        }
        if (submitIcon) {
            submitIcon.innerHTML = icons.spinner;
        }
        if (submitLabel) {
            submitLabel.textContent = 'SECURELY RESERVING SLOTS...';
        }

        window.setTimeout(() => {
            const fullName = form.querySelector('input[name="fullName"]')?.value.trim() || 'Traveler';
            state.generatedPass = `TRV-MH-${Math.floor(1000 + Math.random() * 9000)}`;

            document.querySelector('[data-success-name]').textContent = fullName;
            document.querySelector('[data-ticket-name]').textContent = fullName;
            document.querySelector('[data-ticket-seats]').textContent = state.seats;
            document.querySelector('[data-ticket-code]').textContent = state.generatedPass;

            const whatsApp = document.querySelector('[data-whatsapp-ticket]');
            if (whatsApp) {
                const message = `Hi TRAVO! My name is ${fullName}. I just reserved ${state.seats} seats under code ${state.generatedPass}. Please verify my ticket.`;
                whatsApp.href = `https://wa.me/911234567890?text=${encodeURIComponent(message)}`;
            }

            form.hidden = true;
            setHidden(successPanel, false, 'flex');
            resetSubmitState();
        }, 1800);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    updateReceipt();
}

function initRouteJourney() {
    const dataNode = document.getElementById('route-stops-data');
    const van = document.querySelector('[data-route-van]');
    const autoButton = document.querySelector('[data-route-autoplay]');

    if (!dataNode || !van || !autoButton) {
        return;
    }

    const stops = JSON.parse(dataNode.textContent || '[]');
    if (!stops.length) {
        return;
    }

    let activeIndex = 0;
    let isPlaying = false;
    let intervalId = null;

    const tag = document.querySelector('[data-route-tag]');
    const count = document.querySelector('[data-route-count]');
    const name = document.querySelector('[data-route-name]');
    const description = document.querySelector('[data-route-description]');
    const altitude = document.querySelector('[data-route-altitude]');
    const autoIcon = document.querySelector('[data-route-autoplay-icon]');
    const autoLabel = document.querySelector('[data-route-autoplay-label]');

    function selectStop(index) {
        activeIndex = (index + stops.length) % stops.length;
        const stop = stops[activeIndex];

        van.style.left = `${stop.coords.x}%`;
        van.style.top = `${stop.coords.y}%`;

        if (tag) {
            tag.textContent = stop.tag;
        }
        if (count) {
            count.textContent = `STOP ${activeIndex + 1} / ${stops.length}`;
        }
        if (name) {
            name.textContent = stop.name;
        }
        if (description) {
            description.textContent = stop.description;
        }
        if (altitude) {
            altitude.textContent = stop.altitude;
        }

        queryAll('[data-route-index]').forEach((button) => {
            button.classList.toggle('is-active', Number(button.dataset.routeIndex) === activeIndex);
        });
    }

    function setPlaying(nextValue) {
        isPlaying = nextValue;
        window.clearInterval(intervalId);
        intervalId = null;

        autoButton.classList.toggle('bg-amber-400', isPlaying);
        autoButton.classList.toggle('text-black', isPlaying);
        autoButton.classList.toggle('border-amber-400', isPlaying);
        autoButton.classList.toggle('shadow-lg', isPlaying);
        autoButton.classList.toggle('shadow-amber-400/25', isPlaying);
        autoButton.classList.toggle('bg-white/5', !isPlaying);
        autoButton.classList.toggle('text-white', !isPlaying);
        autoButton.classList.toggle('border-white/10', !isPlaying);

        if (autoIcon) {
            autoIcon.innerHTML = isPlaying ? icons.pause : icons.play;
        }
        if (autoLabel) {
            autoLabel.textContent = isPlaying ? 'Pausing Tour' : 'Auto Drive Tour';
        }

        if (isPlaying) {
            intervalId = window.setInterval(() => {
                selectStop(activeIndex + 1);
            }, 5000);
        }
    }

    queryAll('[data-route-index]').forEach((button) => {
        button.addEventListener('click', () => {
            setPlaying(false);
            selectStop(Number(button.dataset.routeIndex || 0));
        });
    });

    document.querySelector('[data-route-next]')?.addEventListener('click', () => {
        setPlaying(false);
        selectStop(activeIndex + 1);
    });

    document.querySelector('[data-route-prev]')?.addEventListener('click', () => {
        setPlaying(false);
        selectStop(activeIndex - 1);
    });

    autoButton.addEventListener('click', () => {
        setPlaying(!isPlaying);
    });

    selectStop(0);
}

function initChecklist() {
    const items = queryAll('[data-checklist-item]');
    const count = document.querySelector('[data-checklist-count]');
    const percent = document.querySelector('[data-checklist-percent]');
    const circle = document.querySelector('[data-checklist-circle]');
    const ready = document.querySelector('[data-checklist-ready]');
    const circumference = 2 * Math.PI * 32;

    if (!items.length || !circle) {
        return;
    }

    function update() {
        const checkedCount = items.filter((item) => item.classList.contains('is-checked')).length;
        const progress = Math.round((checkedCount / items.length) * 100) || 0;

        if (count) {
            count.textContent = checkedCount;
        }
        if (percent) {
            percent.textContent = `${progress}%`;
        }

        circle.style.strokeDashoffset = String(circumference * (1 - progress / 100));
        setHidden(ready, progress !== 100, 'inline-flex');
    }

    items.forEach((item) => {
        item.addEventListener('click', () => {
            item.classList.toggle('is-checked');
            item.querySelector('.checklist-check')?.classList.toggle('hidden', !item.classList.contains('is-checked'));
            update();
        });
    });

    document.querySelector('[data-checklist-reset]')?.addEventListener('click', () => {
        items.forEach((item) => {
            item.classList.remove('is-checked');
            item.querySelector('.checklist-check')?.classList.add('hidden');
        });
        update();
    });

    update();
}

function initAccordions() {
    const items = queryAll('[data-accordion-item]');
    if (!items.length) {
        return;
    }

    function setAccordion(openIndex) {
        items.forEach((item, index) => {
            const isOpen = index === openIndex;
            const panel = item.querySelector('[data-accordion-panel]');
            const icon = item.querySelector('[data-accordion-icon]');

            item.classList.toggle('is-open', isOpen);
            panel?.classList.toggle('max-h-[300px]', isOpen);
            panel?.classList.toggle('border-t', isOpen);
            panel?.classList.toggle('border-white/5', isOpen);
            panel?.classList.toggle('max-h-0', !isOpen);

            if (icon) {
                icon.innerHTML = isOpen ? icons.minus : icons.plus;
            }
        });
    }

    items.forEach((item, index) => {
        item.querySelector('[data-accordion-toggle]')?.addEventListener('click', () => {
            setAccordion(item.classList.contains('is-open') ? -1 : index);
        });
    });
}

function initDownloadButton() {
    const button = document.querySelector('[data-download-itinerary]');
    if (!button) {
        return;
    }

    const icon = button.querySelector('[data-download-icon]');
    const label = button.querySelector('[data-download-label]');
    let resetTimer = null;

    button.addEventListener('click', () => {
        window.clearTimeout(resetTimer);
        button.disabled = true;
        if (icon) {
            icon.innerHTML = icons.spinner;
        }
        if (label) {
            label.textContent = 'Generating booklet...';
        }

        window.setTimeout(() => {
            button.disabled = false;
            if (icon) {
                icon.innerHTML = icons.check;
            }
            if (label) {
                label.textContent = 'Success! Saved';
            }

            resetTimer = window.setTimeout(() => {
                if (icon) {
                    icon.innerHTML = icons.download;
                }
                if (label) {
                    label.textContent = 'Download Itinerary (PDF)';
                }
            }, 4000);
        }, 2000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initHeroParallax();
    initBookingModal();
    initRouteJourney();
    initChecklist();
    initAccordions();
    initDownloadButton();
});
