import { conf } from "@/conf/conf";
import { Account, Client } from "node-appwrite";

const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(conf.appwrite_url)
    .setProject(conf.appwrite_project_id)
    .setKey(conf.appwrite_api_key);

  return {
    get account() {
      return new Account(client);
    },
  };
};

export { createAdminClient };