#include "tddStringTest.h"
using namespace std;

int add(const std::string &numbers) {
    // Initialize the sum
    int sum = 0;

    // Custom delimiter (default to comma)
    char delimiter = ',';

    // Check if the input string starts with "//"
    std::string actual_numbers = numbers;
    if (numbers.size() >= 2 && numbers[0] == '/' && numbers[1] == '/') {
        // Extract the delimiter from the input string
        delimiter = numbers[2];
        // Find the actual numbers part after the delimiter definition
        actual_numbers = numbers.substr(4); // Skip "//<delimiter>\n"
    }

    // Read numbers from the string
    std::string num;
    bool last_char_was_delimiter = false;
    for (char c : actual_numbers) {
        if (std::isdigit(c)) {
            if (last_char_was_delimiter) {
                last_char_was_delimiter = false;
            }
            num += c;
        } else if (c == delimiter || c == '\n') {
            if (last_char_was_delimiter) {
                // Two delimiters in a row
                return -1;
            }
            last_char_was_delimiter = true;
            // Convert the substring to an integer
            if (!num.empty()) {
                int value = std::stoi(num);
                // Add to the sum
                sum += value;
                num.clear();
            }
        } else {
            // Invalid character found
            return -1;
        }
    }

    // Handle the last number (if any)
    if (!num.empty()) {
        int value = std::stoi(num);
        sum += value;
    } else if (last_char_was_delimiter) {
        // Trailing delimiter
        return -1;
    }

    return sum;
}
int main() {
    // Example test cases
    tdd_run_test(1, add("//;\n1;2"), 3);
    tdd_run_test(2, add("1,2\n3"), 6);
    tdd_run_test(3, add("1,2,"), -1);

    // Additional test cases
    tdd_run_test(4, add(""), 0);           // Empty string1
    tdd_run_test(5, add("1,,2"), -1);      // Multiple delimiter
    tdd_run_test(6, add("1,2,3"), 6);      // Multiple integers with comma delimiter
    tdd_run_test(7, add("1\n2\n3"), 6);    // Multiple integers with newline delimiter
    tdd_run_test(8, add("//|\n1|2|3"), 6); // Custom delimiter (|)
    tdd_run_test(9, add("//.\n1.2.3"), 6); // Custom delimiter (.)
    tdd_run_test(10, add("//+\n1+2+3"), 6);// Custom delimiter (+)

    return 0;
}
//Made by Nguyen Cao Thang - Student ID: 22521329