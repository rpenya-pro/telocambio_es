interface Proposal {
  _id?: string;
  owner: string;
  articleInterested: string;
  myOfferArticle: string;
  user: string;
  proposalDate: Date;
  expireDate?: Date;
  proposalReference: string;
}

export default Proposal;
