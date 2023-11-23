const core = require("@actions/core");

const changesetsPublishedPackages = JSON.parse(
  core.getInput("changesets-action-published-packages", { required: true }),
);
const packages = core.getInput("packages");

const parsedPackages = packages
  .map(package => {
    const changesetsPublishedPackage = changesetsPublishedPackages.find(
      publishedPackage => publishedPackage.name === package.name,
    );

    if (!changesetsPublishedPackage) {
      return;
    }

    return { ...package, ...changesetsPublishedPackage };
  })
  .filter(package => package !== undefined);

core.setOutput("packages", parsedPackages);
