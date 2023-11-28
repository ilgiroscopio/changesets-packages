const core = require("@actions/core");

const changesetsPublishedPackages = JSON.parse(
  core.getInput("changesets-action-published-packages", { required: true }),
);
if (!Array.isArray(changesetsPublishedPackages)) {
  throw new Error(
    "'changesets-action-published-packages' input is not a JSON array",
  );
}

const packages = JSON.parse(core.getInput("packages"), { required: true });
if (!Array.isArray(packages)) {
  throw new Error("'packages' input is not a JSON array");
}

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
