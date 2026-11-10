<?php

/*
 * Legacy alias. Laravel and Filament call Norwegian "nb", not "no", so the strings
 * live in ../nb/message.php. This folder stays so an app whose locale is "no",
 * or that published it, keeps working.
 */
return require __DIR__ . '/../nb/message.php';
