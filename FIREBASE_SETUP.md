# Firebase Database Setup

To fix the "Index not defined" error, you need to properly configure your Firebase Realtime Database rules.

## Steps to Fix the Issue

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project (aura-6b04d)
3. Navigate to "Realtime Database" in the left sidebar
4. Click on the "Rules" tab
5. Replace the existing rules with the following:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null",
    "colleges": {
      ".indexOn": ["name"],
      "$collegeId": {
        ".read": true,
        ".write": "auth != null",
        "name": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "campusCEO": {
          ".write": "auth != null",
          "name": {
            ".validate": "newData.isString() && newData.val().length > 0"
          },
          "email": {
            ".validate": "newData.isString() && newData.val().matches(/^[^@]+@[^@]+\\.[^@]+$/)"
          },
          "phone": {
            ".validate": "newData.isString()"
          },
          "timestamp": {
            ".validate": "newData.isNumber()"
          }
        },
        "waitlist": {
          ".read": true,
          ".write": "auth != null",
          "$waitlistId": {
            ".validate": "newData.hasChildren(['name', 'email', 'timestamp'])",
            "name": {
              ".validate": "newData.isString() && newData.val().length > 0"
            },
            "email": {
              ".validate": "newData.isString() && newData.val().matches(/^[^@]+@[^@]+\\.[^@]+$/)"
            },
            "timestamp": {
              ".validate": "newData.isNumber()"
            },
            "$other": {
              ".validate": false
            }
          }
        }
      }
    },
    "test": {
      ".read": true,
      ".write": true
    }
  }
}
```

6. Click "Publish" to save the rules

## Alternative Solution

If you cannot modify the database rules, the application will continue to work with the fallback mechanism that has been implemented. However, this will be less efficient as it needs to download all college data instead of querying specific records.

## Testing the Fix

After updating the rules:
1. Refresh the waitlist page
2. Try adding a new entry to the waitlist
3. The "Index not defined" error should no longer appear

## For Development

If you're using the Firebase Emulator Suite, make sure to update your local rules file at `database.rules.json` with the same content as above.