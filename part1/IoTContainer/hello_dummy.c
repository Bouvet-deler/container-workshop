
int main() {
    while (1) {
        // Husk i IoT uten Operativ systemer, så er det ingen ting å avslutte til.
    }
}

void exit(int status) {
    while (1) {
        // Ditto. Kall til exit kan ikke sendes videre til OS, som ikke eksisterer på IoT devicer.
    }
}