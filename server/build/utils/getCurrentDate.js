"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDateTime = void 0;
function getFormattedDateTime() {
    const now = new Date();
    // Obtém os componentes individuais da data e hora
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    // Formata a data e hora no formato ISO 8601
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return new Date(formattedDateTime);
}
exports.getFormattedDateTime = getFormattedDateTime;
