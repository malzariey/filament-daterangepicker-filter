<?php

/*
 * Legacy alias. Laravel and Filament call Greek "el", not "gr", so the strings
 * live in ../el/message.php. This folder stays so an app whose locale is "gr",
 * or that published it, keeps working.
 */
return require __DIR__ . '/../el/message.php';
