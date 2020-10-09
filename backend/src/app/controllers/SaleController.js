import Sale from '../models/Sale';

class SaleController {
  async store(req, res) {
    const sale = await Sale.create(req.body);

    return res.json(sale);
  }

  async index(req,res) {
    const sales = await Sale.find();

    return res.json(sales);
  }

  async show(req, res) {
    const { id } = req.params;

    const sale = await Sale.findOne({ _id: id });

    return res.json(sale);
  }

  async update(req, res) {
    const { id } = req.params;

    const sale = await Sale.findByIdAndUpdate({ _id: id }, req.body, { new: true });
  
    return res.json(sale);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Sale.deleteOne({ _id: id });

    return res.json({ message: 'Deleted with success' });
  }
}

export default new SaleController();
