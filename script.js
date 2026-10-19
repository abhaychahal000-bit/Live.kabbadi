
/* =========================================
   KABADDI PUNJAB LIVE
   Website JavaScript
   ========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. MOBILE NAVIGATION
    // =====================================

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        function closeMenu() {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation");
            menuToggle.textContent = "☰";
        }

        function openMenu() {
            mainNav.classList.add("open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation");
            menuToggle.textContent = "✕";
        }

        menuToggle.addEventListener("click", function () {
            const isOpen = mainNav.classList.contains("open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close the menu after clicking a navigation link.

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });

        // Close the menu when clicking outside it.

        document.addEventListener("click", function (event) {
            const clickedInsideMenu = mainNav.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Close the mobile menu when Escape is pressed.

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Reset the navigation if the screen becomes desktop-sized.

        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });

    }


    // =====================================
    // 2. TOURNAMENT REMINDER BUTTONS
    // =====================================

    const reminderButtons = document.querySelectorAll(".reminder-btn");

    reminderButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const eventName =
                button.getAttribute("data-event") ||
                "Kabaddi Tournament";

            // Use the Web Share API when available.
            // Otherwise, offer a copyable reminder message.

            const reminderText =
                "Reminder: Check the date and time for " +
                eventName +
                " on Kabaddi Punjab Live.";

            if (navigator.share) {

                navigator.share({
                    title: "Kabaddi Tournament Reminder",
                    text: reminderText
                }).catch(function (error) {

                    // Ignore cancellations by the user.
                    if (error.name !== "AbortError") {
                        showReminderMessage(reminderText);
                    }

                });

            } else if (navigator.clipboard &&
                       window.isSecureContext) {

                navigator.clipboard.writeText(reminderText)
                    .then(function () {
                        showReminderMessage(
                            "Reminder message copied! " +
                            "Add the actual tournament date " +
                            "and time before setting your reminder."
                        );
                    })
                    .catch(function () {
                        showReminderMessage(reminderText);
                    });

            } else {

                showReminderMessage(reminderText);

            }

        });

    });


    // =====================================
    // 3. REMINDER FEEDBACK
    // =====================================

    function showReminderMessage(message) {

        // Create the notification if it does not exist.

        let notification = document.getElementById(
            "kabaddiNotification"
        );

        if (!notification) {

            notification = document.createElement("div");

            notification.id = "kabaddiNotification";

            notification.setAttribute("role", "status");
            notification.setAttribute("aria-live", "polite");

            notification.style.position = "fixed";
            notification.style.left = "50%";
            notification.style.bottom = "24px";
            notification.style.transform = "translateX(-50%)";
            notification.style.width = "max-content";
            notification.style.maxWidth = "calc(100% - 32px)";
            notification.style.padding = "14px 20px";
            notification.style.background = "#d9a62e";
            notification.style.color = "#15140f";
            notification.style.fontSize = "14px";
            notification.style.fontWeight = "700";
            notification.style.borderRadius = "8px";
            notification.style.boxShadow =
                "0 8px 25px rgba(0,0,0,0.35)";
            notification.style.zIndex = "2000";
            notification.style.textAlign = "center";

            document.body.appendChild(notification);

        }

        notification.textContent = message;

    }


    // =====================================
    // 4. AUTOMATIC COPYRIGHT YEAR
    // =====================================

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // =====================================
    // 5. SMOOTH INTERNAL NAVIGATION
    // =====================================

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Keep the address bar in sync with the section.

            if (window.location.hash !== targetId) {
                history.pushState(null, "", targetId);
            }

        });

    });


    // =====================================
    // 6. WEBSITE INITIALIZATION
    // =====================================

    console.log("Kabaddi Punjab Live website loaded successfully.");

});
