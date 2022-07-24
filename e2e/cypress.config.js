import { defineConfig } from "cypress";

import _ from "lodash";
import { deleteAsync } from "del";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("after:spec", (spec, results) => {
        if (results && results.video) {
          const failures = _.some(results.tests, (test) => {
            return _.some(test.attempts, { state: "failed" });
          });
          if (!failures) {
            return deleteAsync(results.video);
          }
        }
      });
    },
    baseUrl: "http://localhost:3000",
  },
});
